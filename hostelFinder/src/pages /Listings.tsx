import { useState, useEffect } from "react";
import { Building2, Search, Filter, Star, MapPin, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useBookmarks } from "@/hooks/useBookmarks";
import React from "react";

interface Listing {
  id: string;
  name: string;
  price: number;
  address: string;
  amenities: string[];
  description: string | null;
  image_url: string | null;
  avg_rating: number | null;
  review_count: number;
}

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data: hostels, error } = await supabase
        .from('hostels')
        .select(`
          id,
          name,
          price,
          address,
          amenities,
          description,
          hostel_images (
            image_url,
            display_order
          ),
          reviews (
            rating
          )
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedListings: Listing[] = (hostels || []).map((hostel: any) => {
        const ratings = hostel.reviews?.map((r: any) => r.rating) || [];
        const avgRating = ratings.length > 0 
          ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length 
          : null;
        
        const sortedImages = hostel.hostel_images?.sort(
          (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
        );

        return {
          id: hostel.id,
          name: hostel.name,
          price: Number(hostel.price),
          address: hostel.address,
          amenities: hostel.amenities || [],
          description: hostel.description,
          image_url: sortedImages?.[0]?.image_url || null,
          avg_rating: avgRating,
          review_count: ratings.length
        };
      });

      setListings(formattedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.amenities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HostelFinder</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Hostels</h1>
          <p className="text-muted-foreground">Find your perfect student accommodation</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or amenities..."
              className="pl-10"
              value={searchQuery}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6"></div>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${filteredListings.length} hostels found`}
          </p>
        </div>

        {/* Listings Grid */}
          {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow overflow-hidden group relative">
                <Link to={`/hostel/${listing.id}`}>
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {listing.image_url ? (
                      <img 
                        src={listing.image_url} 
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </Link>
                
                {user && userRole === 'student' && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 z-10"
                    onClick={(e: { preventDefault: () => void; }) => {
                      e.preventDefault();
                      toggleBookmark(listing.id);
                    }}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${isBookmarked(listing.id) ? 'fill-primary text-primary' : ''}`}
                    />
                  </Button>
                )}
                
                <Link to={`/hostel/${listing.id}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg leading-tight">{listing.name}</h3>
                      {listing.avg_rating && (
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-sm font-medium">{listing.avg_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{listing.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {listing.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <p className="text-2xl font-bold text-primary">₦{listing.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>

            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    
  );
};

export default Listings;
