import { Building2, Search, Bookmark, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const StudentDashboard = () => {
  const quickActions = [
    { icon: Search, label: "Search Hostels", link: "/listings", color: "text-primary" },
    { icon: Bookmark, label: "Bookmarks", link: "/bookmarks", color: "text-secondary" },
    { icon: MessageSquare, label: "My Reviews", link: "/my-reviews", color: "text-accent" },
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
              <div className="text-sm text-muted-foreground text-center py-8">
                No bookmarks yet. Save your favorite hostels to view them here.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
