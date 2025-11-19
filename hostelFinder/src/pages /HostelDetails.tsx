import { Building2, Star, MapPin, Wifi, Car, Dumbbell, ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HostelDetails = () => {
  const { id } = useParams();

  // Mock data - replace with actual data
  const hostel = {
    id: 1,
    name: "Cozy Campus Hostel",
    price: 5000,
    address: "123 University Road, Campus Area",
    rating: 4.5,
    reviewCount: 12,
    description: "A comfortable and safe student accommodation located just 5 minutes walk from the main campus. Our hostel offers modern facilities and a friendly atmosphere perfect for focused study and comfortable living.",
    amenities: [
      { icon: Wifi, name: "High-Speed WiFi" },
      { icon: Car, name: "Parking Available" },
      { icon: Dumbbell, name: "Gym Access" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  };

  const reviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent hostel! Very clean and the WiFi is super fast. Perfect for studying."
    },
    {
      id: 2,
      userName: "Michael Chen",
      rating: 4,
      date: "1 month ago",
      comment: "Great location and friendly landlord. The only downside is the parking can get full sometimes."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HostelFinder</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/listings">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 rounded-lg overflow-hidden">
          <div className="md:col-span-2 aspect-video bg-muted"></div>
          <div className="grid grid-rows-2 gap-4">
            <div className="aspect-video bg-muted"></div>
            <div className="aspect-video bg-muted"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{hostel.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-primary fill-primary" />
                      <span className="font-medium">{hostel.rating}</span>
                      <span>({hostel.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-5 w-5" />
                      <span>{hostel.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">About this hostel</h2>
              <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {hostel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <amenity.icon className="h-5 w-5 text-primary" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-primary fill-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-primary">₦{hostel.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <Button className="w-full" size="lg">Contact Landlord</Button>
                <Button className="w-full" size="lg" variant="outline">Save to Bookmarks</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
