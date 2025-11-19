import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Search, Shield, Star, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  const features = [{
    icon: Shield,
    title: "Verified Listings",
    description: "All hostels are verified by our admin team before appearing on the platform"
  }, {
    icon: Star,
    title: "Student Reviews",
    description: "Read honest reviews from fellow students about their experiences"
  }, {
    icon: Search,
    title: "Smart Filters",
    description: "Find your perfect hostel with advanced search and filter options"
  }, {
    icon: Users,
    title: "Easy to Use",
    description: "Simple, intuitive interface designed specifically for students"
  }];
  const howItWorks = [{
    step: 1,
    title: "For Students",
    points: ["Search for hostels", "Read reviews & ratings", "Bookmark favorites", "Post your own reviews"]
  }, {
    step: 2,
    title: "For Landlords",
    points: ["List your hostel", "Add photos & details", "Get admin approval", "Receive bookings"]
  }];
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">HostelFinder</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Find Verified Hostels Near Campus — <span className="text-primary">Quickly and Safely</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover safe, verified off-campus accommodations trusted by thousands of students. Search, compare, and book with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/listings">
              <Button size="lg" className="text-lg px-8">
                Browse Hostels
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8">
                List Your Hostel
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse"></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HostelFinder */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose HostelFinder?</h2>
            <p className="text-muted-foreground text-lg">Everything you need to find safe student accommodation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to get started</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((section, index) => <Card key={index} className="border-border">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {section.step}
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.points.map((point, i) => <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HostelFinder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Helping students find safe, verified off-campus accommodations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/listings" className="hover:text-primary">Browse Hostels</Link></li>
                <li><Link to="/register" className="hover:text-primary">List Your Hostel</Link></li>
                <li><Link to="/login" className="hover:text-primary">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">
                support@hostelfinder.com
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 HostelFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;