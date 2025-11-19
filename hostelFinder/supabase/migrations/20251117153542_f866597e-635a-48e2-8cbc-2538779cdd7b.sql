-- Create enums for roles and listing status
CREATE TYPE public.app_role AS ENUM ('student', 'landlord', 'admin');
CREATE TYPE public.listing_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create hostels table
CREATE TABLE public.hostels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  address TEXT NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  status listing_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;

-- Create hostel_images table
CREATE TABLE public.hostel_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id UUID REFERENCES public.hostels(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.hostel_images ENABLE ROW LEVEL SECURITY;

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id UUID REFERENCES public.hostels(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(hostel_id, student_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hostel_id UUID REFERENCES public.hostels(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(student_id, hostel_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  
  -- Insert role from metadata (default to student if not specified)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student'::app_role)
  );
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.hostels
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for hostels
CREATE POLICY "Approved hostels are viewable by everyone"
  ON public.hostels FOR SELECT
  USING (status = 'approved' OR landlord_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Landlords can create hostels"
  ON public.hostels FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'landlord') AND auth.uid() = landlord_id);

CREATE POLICY "Landlords can update own hostels"
  ON public.hostels FOR UPDATE
  USING (landlord_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Landlords and admins can delete hostels"
  ON public.hostels FOR DELETE
  USING (landlord_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for hostel_images
CREATE POLICY "Images viewable with hostel"
  ON public.hostel_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.hostels h 
      WHERE h.id = hostel_id 
      AND (h.status = 'approved' OR h.landlord_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

CREATE POLICY "Landlords can manage their hostel images"
  ON public.hostel_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.hostels h 
      WHERE h.id = hostel_id 
      AND (h.landlord_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.hostels h 
      WHERE h.id = hostel_id AND h.status = 'approved'
    )
  );

CREATE POLICY "Students can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (
    public.has_role(auth.uid(), 'student') 
    AND auth.uid() = student_id
    AND NOT EXISTS (
      SELECT 1 FROM public.hostels h 
      WHERE h.id = hostel_id AND h.landlord_id = auth.uid()
    )
  );

CREATE POLICY "Students can update own reviews"
  ON public.reviews FOR UPDATE
  USING (student_id = auth.uid());

CREATE POLICY "Students and admins can delete reviews"
  ON public.reviews FOR DELETE
  USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bookmarks
CREATE POLICY "Students can view own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Students can create bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'student') AND auth.uid() = student_id);

CREATE POLICY "Students can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (student_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_hostels_status ON public.hostels(status);
CREATE INDEX idx_hostels_landlord ON public.hostels(landlord_id);
CREATE INDEX idx_reviews_hostel ON public.reviews(hostel_id);
CREATE INDEX idx_reviews_student ON public.reviews(student_id);
CREATE INDEX idx_bookmarks_student ON public.bookmarks(student_id);
CREATE INDEX idx_bookmarks_hostel ON public.bookmarks(hostel_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);