import { Building2, Search, Bookmark, MessageSquare, User, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface BookmarkedHostel {
  id: string;
  name: string;
  price: number;
  address: string;
  image_url: string | null;
  avg_rating: number | null;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [bookmarkedHostels, setBookmarkedHostels] = useState<BookmarkedHostel[]>([]);
  const [loading, setLoading] = useState(true);

  const quickActions = [
    { icon: Search, label: "Search Hostels", link: "/listings", color: "text-primary" },
    { icon: Bookmark, label: "Bookmarks", link: "/bookmarks", color: "text-secondary" },
    { icon: MessageSquare, label: "My Reviews", link: "/my-reviews", color: "text-accent" },
  ];

  useEffect(() => {
    if (user) {
      fetchBookmarkedHostels();

      // Set up real-time subscription
      const channel = supabase
        .channel('dashboard-bookmarks')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks',
            filter: `student_id=eq.${user.id}`
          },
          () => {
            fetchBookmarkedHostels();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchBookmarkedHostels = async () => {
    if (!user) return;

    try {
      const { data: bookmarks, error } = await supabase
        .from('bookmarks')
        .select(`
          hostel_id,
          hostels (
            id,
            name,
            price,
            address,
            hostel_images (
              image_url,
              display_order
            ),
            reviews (
              rating
            )
          )
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formatted: BookmarkedHostel[] = (bookmarks || [])
        .filter((b: any) => b.hostels)
        .map((bookmark: any) => {
          const hostel = bookmark.hostels;
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
            image_url: sortedImages?.[0]?.image_url || null,
            avg_rating: avgRating
          };
        });

      setBookmarkedHostels(formatted);
    } catch (error) {
      console.error('Error fetching bookmarked hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/student-dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HostelFinder</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/listings">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Find your perfect accommodation near campus</p>
        </div>

        {/* Quick Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Search</CardTitle>
            <CardDescription>Search for hostels by name, location, or amenities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Search hostels..." className="flex-1" />
              <Link to="/listings">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-lg">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center py-8">
                No recent searches yet. Start exploring hostels!
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Hostels</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : bookmarkedHostels.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No bookmarks yet. Save your favorite hostels to view them here.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookmarkedHostels.map((hostel) => (
                    <Link key={hostel.id} to={`/hostel/${hostel.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                        <div className="w-20 h-20 rounded bg-muted flex-shrink-0 overflow-hidden">
                          {hostel.image_url ? (
                            <img 
                              src={hostel.image_url} 
                              alt={hostel.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold truncate">{hostel.name}</h4>
                            {hostel.avg_rating && (
                              <Badge variant="secondary" className="flex-shrink-0">
                                <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                                {hostel.avg_rating.toFixed(1)}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{hostel.address}</span>
                          </p>
                          <p className="text-primary font-bold mt-2">₦{hostel.price.toLocaleString()}/mo</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link to="/listings">
                    <Button variant="outline" className="w-full">View All Bookmarks</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;