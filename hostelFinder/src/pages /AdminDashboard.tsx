import { Building2, User, Clock, CheckCircle, Home, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  // Mock data - replace with actual data
  const pendingListings = [
    {
      id: 1,
      name: "Modern Student Living",
      landlord: "John Smith",
      price: 6500,
      submitted: "2 hours ago"
    },
    {
      id: 2,
      name: "Campus View Hostel",
      landlord: "Jane Doe",
      price: 5500,
      submitted: "5 hours ago"
    },
  ];

  const stats = [
    { icon: Home, label: "Total Listings", value: "45", color: "text-primary" },
    { icon: Clock, label: "Pending Approval", value: "2", color: "text-warning" },
    { icon: Users, label: "Total Users", value: "128", color: "text-secondary" },
    { icon: AlertCircle, label: "Flagged Reviews", value: "3", color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HostelFinder Admin</span>
          </Link>
          <div className="flex items-center gap-3">
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage listings, users, and platform content</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
            <TabsTrigger value="listings">All Listings</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Listing Approvals</CardTitle>
                <CardDescription>Review and approve new hostel listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground">by {listing.landlord}</p>
                        <p className="text-sm text-muted-foreground">₦{listing.price.toLocaleString()}/month</p>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {listing.submitted}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" className="bg-success hover:bg-success/90">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>All Listings</CardTitle>
                <CardDescription>View and manage all hostel listings on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Listing management interface coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage student and landlord accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  User management interface coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>Review reported listings and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Reports interface coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
