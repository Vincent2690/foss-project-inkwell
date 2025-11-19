import { useState } from "react";
import { Building2, Search, Filter, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data
  const listings = [
    {
      id: 1,
      name: "Cozy Campus Hostel",
      price: 5000,
      address: "123 University Road, Campus Area",
      rating: 4.5,
      reviews: 12,
      amenities: ["WiFi", "Kitchen", "Laundry"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Modern Student Living",
      price: 6500,
      address: "456 College Street, Student Quarter",
      rating: 4.8,
      reviews: 24,
      amenities: ["WiFi", "Gym", "Parking"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Affordable Study Space",
      price: 4200,
      address: "789 Academia Avenue",
      rating: 4.2,
      reviews: 8,
      amenities: ["WiFi", "Study Room"],
      image: "/placeholder.svg"
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">{listings.length} hostels found</p>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Link key={listing.id} to={`/hostel/${listing.id}`}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg leading-tight">{listing.name}</h3>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      <span className="text-sm font-medium">{listing.rating}</span>
                    </div>
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
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {listings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
