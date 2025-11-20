"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var hostel_1_jpg_1 = require("@/assets/hostel-1.jpg");
var hostel_2_jpg_1 = require("@/assets/hostel-2.jpg");
var hostel_3_jpg_1 = require("@/assets/hostel-3.jpg");
var hostel_4_jpg_1 = require("@/assets/hostel-4.jpg");
var Index = function () {
    var features = [{
            icon: lucide_react_1.Shield,
            title: "Verified Listings",
            description: "All hostels are verified by our admin team before appearing on the platform"
        }, {
            icon: lucide_react_1.Star,
            title: "Student Reviews",
            description: "Read honest reviews from fellow students about their experiences"
        }, {
            icon: lucide_react_1.Search,
            title: "Smart Filters",
            description: "Find your perfect hostel with advanced search and filter options"
        }, {
            icon: lucide_react_1.Users,
            title: "Easy to Use",
            description: "Simple, intuitive interface designed specifically for students"
        }];
    var howItWorks = [{
            step: 1,
            title: "For Students",
            points: ["Search for hostels", "Read reviews & ratings", "Bookmark favorites", "Post your own reviews"]
        }, {
            step: 2,
            title: "For Landlords",
            points: ["List your hostel", "Add photos & details", "Get admin approval", "Receive bookings"]
        }];
    return react_1.default.createElement("div", { className: "min-h-screen bg-background" },
        react_1.default.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            react_1.default.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                react_1.default.createElement("div", { className: "flex items-center gap-2" },
                    react_1.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    react_1.default.createElement("span", { className: "text-xl font-bold text-foreground" }, "HostelFinder")),
                react_1.default.createElement("div", { className: "flex items-center gap-3" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/login" },
                        react_1.default.createElement(button_1.Button, { variant: "ghost" }, "Login")),
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/register" },
                        react_1.default.createElement(button_1.Button, null, "Get Started"))))),
        react_1.default.createElement("section", { className: "container mx-auto px-4 py-20 text-center" },
            react_1.default.createElement("div", { className: "max-w-4xl mx-auto space-y-6" },
                react_1.default.createElement("h1", { className: "text-5xl md:text-6xl font-bold text-foreground leading-tight" },
                    "Find Verified Hostels Near Campus \u2014 ",
                    react_1.default.createElement("span", { className: "text-primary" }, "Quickly and Safely")),
                react_1.default.createElement("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto" }, "Discover safe, verified off-campus accommodations trusted by thousands of students. Search, compare, and book with confidence."),
                react_1.default.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center pt-4" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/listings" },
                        react_1.default.createElement(button_1.Button, { size: "lg", className: "text-lg px-8" }, "Browse Hostels")),
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/register" },
                        react_1.default.createElement(button_1.Button, { size: "lg", variant: "outline", className: "text-lg px-8" }, "List Your Hostel")))),
            react_1.default.createElement("div", { className: "mt-16 relative" },
                react_1.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl" }),
                react_1.default.createElement("div", { className: "relative bg-card border border-border rounded-2xl p-8 shadow-lg" },
                    react_1.default.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6" }, [hostel_1_jpg_1.default, hostel_2_jpg_1.default, hostel_3_jpg_1.default, hostel_4_jpg_1.default].map(function (img, i) { return (react_1.default.createElement("div", { key: i, className: "aspect-square rounded-xl overflow-hidden" },
                        react_1.default.createElement("img", { src: img, alt: "Hostel ".concat(i + 1), className: "w-full h-full object-cover" }))); }))))),
        react_1.default.createElement("section", { className: "bg-muted/30 py-20" },
            react_1.default.createElement("div", { className: "container mx-auto px-4" },
                react_1.default.createElement("div", { className: "text-center mb-12" },
                    react_1.default.createElement("h2", { className: "text-4xl font-bold text-foreground mb-4" }, "Why Choose HostelFinder?"),
                    react_1.default.createElement("p", { className: "text-muted-foreground text-lg" }, "Everything you need to find safe student accommodation")),
                react_1.default.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6" }, features.map(function (feature, index) { return react_1.default.createElement(card_1.Card, { key: index, className: "border-border hover:shadow-lg transition-shadow" },
                    react_1.default.createElement(card_1.CardContent, { className: "p-6 space-y-3" },
                        react_1.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" },
                            react_1.default.createElement(feature.icon, { className: "h-6 w-6 text-primary" })),
                        react_1.default.createElement("h3", { className: "text-xl font-semibold text-foreground" }, feature.title),
                        react_1.default.createElement("p", { className: "text-muted-foreground" }, feature.description))); })))),
        react_1.default.createElement("section", { className: "py-20" },
            react_1.default.createElement("div", { className: "container mx-auto px-4" },
                react_1.default.createElement("div", { className: "text-center mb-12" },
                    react_1.default.createElement("h2", { className: "text-4xl font-bold text-foreground mb-4" }, "How It Works"),
                    react_1.default.createElement("p", { className: "text-muted-foreground text-lg" }, "Simple steps to get started")),
                react_1.default.createElement("div", { className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" }, howItWorks.map(function (section, index) { return react_1.default.createElement(card_1.Card, { key: index, className: "border-border" },
                    react_1.default.createElement(card_1.CardContent, { className: "p-8 space-y-4" },
                        react_1.default.createElement("div", { className: "flex items-center gap-3 mb-4" },
                            react_1.default.createElement("div", { className: "w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold" }, section.step),
                            react_1.default.createElement("h3", { className: "text-2xl font-semibold text-foreground" }, section.title)),
                        react_1.default.createElement("ul", { className: "space-y-3" }, section.points.map(function (point, i) { return react_1.default.createElement("li", { key: i, className: "flex items-start gap-2" },
                            react_1.default.createElement(lucide_react_1.CheckCircle, { className: "h-5 w-5 text-success mt-0.5 flex-shrink-0" }),
                            react_1.default.createElement("span", { className: "text-muted-foreground" }, point)); })))); })))),
        react_1.default.createElement("footer", { className: "bg-card border-t border-border py-12" },
            react_1.default.createElement("div", { className: "container mx-auto px-4" },
                react_1.default.createElement("div", { className: "grid md:grid-cols-4 gap-8" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: "flex items-center gap-2 mb-4" },
                            react_1.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                            react_1.default.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")),
                        react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Helping students find safe, verified off-campus accommodations.")),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h4", { className: "font-semibold mb-4" }, "Quick Links"),
                        react_1.default.createElement("ul", { className: "space-y-2 text-sm text-muted-foreground" },
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/listings", className: "hover:text-primary" }, "Browse Hostels")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/register", className: "hover:text-primary" }, "List Your Hostel")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/login", className: "hover:text-primary" }, "Login")))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h4", { className: "font-semibold mb-4" }, "Legal"),
                        react_1.default.createElement("ul", { className: "space-y-2 text-sm text-muted-foreground" },
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/terms", className: "hover:text-primary" }, "Terms of Service")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/privacy", className: "hover:text-primary" }, "Privacy Policy")))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h4", { className: "font-semibold mb-4" }, "Contact"),
                        react_1.default.createElement("p", { className: "text-sm text-muted-foreground" }, "support@hostelfinder.com"))),
                react_1.default.createElement("div", { className: "border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground" }, "\u00A9 2025 HostelFinder. All rights reserved."))));
};
exports.default = Index;
