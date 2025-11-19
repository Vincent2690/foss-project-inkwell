import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, UserCircle, Home } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

type Role = "student" | "landlord" | null;

const Register = () => {
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, user, userRole } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user && userRole) {
      if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'landlord') {
        navigate('/landlord-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  }, [user, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) return;
    
    if (password !== confirmPassword) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName, role);
    
    if (!error) {
      // Show success message and stay on the page
      // User needs to verify email before they can log in
    }
    
    setIsLoading(false);
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Join HostelFinder</CardTitle>
            <CardDescription>
              Choose your account type to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setRole("student")}
                className="group relative p-6 border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all text-left"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">I'm a Student</h3>
                    <p className="text-sm text-muted-foreground">
                      Search for hostels, read reviews, and bookmark your favorites
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setRole("landlord")}
                className="group relative p-6 border-2 border-border rounded-lg hover:border-secondary hover:shadow-lg transition-all text-left"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center transition-colors">
                    <Home className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">I'm a Landlord</h3>
                    <p className="text-sm text-muted-foreground">
                      List your hostels and reach verified students
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {role === "student" ? (
                <UserCircle className="h-6 w-6 text-primary" />
              ) : (
                <Home className="h-6 w-6 text-secondary" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl">
            Create {role === "student" ? "Student" : "Landlord"} Account
          </CardTitle>
          <CardDescription>
            Fill in your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Note:</strong> Your email and role cannot be changed after registration.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setRole(null)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
