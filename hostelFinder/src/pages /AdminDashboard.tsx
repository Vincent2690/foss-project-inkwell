import { Building2, User, Clock, CheckCircle, Home, Users, AlertCircle, LogOut, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import React from "react";

type PendingListing = {
  id: string;
  name: string;
  price: number;
  landlord_id: string;
  created_at: string;
  landlord_name?: string;
};

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    users: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch pending listings with landlord names
    const { data: pending, error: pendingError } = await supabase
      .from('hostels')
      .select(`
        id,
        name,
        price,
        landlord_id,
        created_at
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (pendingError) {
      toast({
        title: "Error fetching pending listings",
        description: pendingError.message,
        variant: "destructive",
      });
    } else if (pending) {
      // Fetch landlord names
      // Fetch landlord names
const landlordIds = pending?.length
  ? [...new Set(pending.map(l => l.landlord_id).filter(Boolean))]
  : [];

const { data: profiles, error } = await supabase
  .from('profiles')
  .select('id, full_name')
  .in('id', landlordIds);

if (error) {
  console.error('Error fetching profiles:', error);
  return;
}

const profileMap = new Map(
  (profiles ?? []).map(p => [p.id, p.full_name])
);

const listingsWithNames = pending.map(l => ({
  ...l,
  landlord_name: profileMap.get(l.landlord_id) || 'Unknown',
}));

setPendingListings(listingsWithNames);


    // Fetch stats
    const { count: totalCount } = await supabase
      .from('hostels')
      .select('*', { count: 'exact', head: true });

    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    setStats({
      total: totalCount || 0,
      pending: pending?.length || 0,
      users: userCount || 0,
    });

    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('hostels')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      toast({
        title: "Approval failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Listing approved",
        description: "The listing has been approved successfully.",
      });
      fetchData();
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from('hostels')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      toast({
        title: "Rejection failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Listing rejected",
        description: "The listing has been rejected.",
      });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Less than an hour ago';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const statItems = [
    { icon: Home, label: "Total Listings", value: stats.total.toString(), color: "text-primary" },
    { icon: Clock, label: "Pending Approval", value: stats.pending.toString(), color: "text-warning" },
    { icon: Users, label: "Total Users", value: stats.users.toString(), color: "text-secondary" },
    { icon: AlertCircle, label: "Flagged Reviews", value: "0", color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/admin-dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HostelFinder Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
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
          {statItems.map((stat, index) => (
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
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : pendingListings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending listings to review
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingListings.map((listing) => (
                      <div key={listing.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{listing.name}</h3>
                          <p className="text-sm text-muted-foreground">by {listing.landlord_name}</p>
                          <p className="text-sm text-muted-foreground">₦{listing.price.toLocaleString()}/month</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {getTimeAgo(listing.created_at)}
                          </Badge>
                          <div className="flex gap-2">
                            <Link to={`/hostel/${listing.id}`}>
                              <Button size="sm" variant="outline">View Details</Button>
                            </Link>
                            <Button 
                              size="sm" 
                              className="bg-success hover:bg-success/90"
                              onClick={() => handleApprove(listing.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(listing.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
};}

export default AdminDashboard;
