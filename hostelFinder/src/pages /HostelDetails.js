"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var separator_1 = require("@/components/ui/separator");
var HostelDetails = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    // Mock data - replace with actual data
    var hostel = {
        id: 1,
        name: "Cozy Campus Hostel",
        price: 5000,
        address: "123 University Road, Campus Area",
        rating: 4.5,
        reviewCount: 12,
        description: "A comfortable and safe student accommodation located just 5 minutes walk from the main campus. Our hostel offers modern facilities and a friendly atmosphere perfect for focused study and comfortable living.",
        amenities: [
            { icon: lucide_react_1.Wifi, name: "High-Speed WiFi" },
            { icon: lucide_react_1.Car, name: "Parking Available" },
            { icon: lucide_react_1.Dumbbell, name: "Gym Access" },
        ],
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    };
    var reviews = [
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
    return (React.createElement("div", { className: "min-h-screen bg-background" },
        React.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            React.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                React.createElement(react_router_dom_1.Link, { to: "/", className: "flex items-center gap-2" },
                    React.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    React.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")))),
        React.createElement("div", { className: "container mx-auto px-4 py-8" },
            React.createElement(react_router_dom_1.Link, { to: "/listings" },
                React.createElement(button_1.Button, { variant: "ghost", className: "mb-6" },
                    React.createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 mr-2" }),
                    "Back to Listings")),
            React.createElement("div", { className: "grid md:grid-cols-3 gap-4 mb-8 rounded-lg overflow-hidden" },
                React.createElement("div", { className: "md:col-span-2 aspect-video bg-muted" }),
                React.createElement("div", { className: "grid grid-rows-2 gap-4" },
                    React.createElement("div", { className: "aspect-video bg-muted" }),
                    React.createElement("div", { className: "aspect-video bg-muted" }))),
            React.createElement("div", { className: "grid lg:grid-cols-3 gap-8" },
                React.createElement("div", { className: "lg:col-span-2 space-y-6" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "flex items-start justify-between mb-3" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-3xl font-bold mb-2" }, hostel.name),
                                React.createElement("div", { className: "flex items-center gap-4 text-muted-foreground" },
                                    React.createElement("div", { className: "flex items-center gap-1" },
                                        React.createElement(lucide_react_1.Star, { className: "h-5 w-5 text-primary fill-primary" }),
                                        React.createElement("span", { className: "font-medium" }, hostel.rating),
                                        React.createElement("span", null,
                                            "(",
                                            hostel.reviewCount,
                                            " reviews)")),
                                    React.createElement("div", { className: "flex items-center gap-1" },
                                        React.createElement(lucide_react_1.MapPin, { className: "h-5 w-5" }),
                                        React.createElement("span", null, hostel.address)))))),
                    React.createElement(separator_1.Separator, null),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-2xl font-semibold mb-3" }, "About this hostel"),
                        React.createElement("p", { className: "text-muted-foreground leading-relaxed" }, hostel.description)),
                    React.createElement(separator_1.Separator, null),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Amenities"),
                        React.createElement("div", { className: "grid md:grid-cols-2 gap-3" }, hostel.amenities.map(function (amenity, index) { return (React.createElement("div", { key: index, className: "flex items-center gap-3 p-3 border border-border rounded-lg" },
                            React.createElement(amenity.icon, { className: "h-5 w-5 text-primary" }),
                            React.createElement("span", null, amenity.name))); }))),
                    React.createElement(separator_1.Separator, null),
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-2xl font-semibold mb-4" }, "Student Reviews"),
                        React.createElement("div", { className: "space-y-4" }, reviews.map(function (review) { return (React.createElement(card_1.Card, { key: review.id },
                            React.createElement(card_1.CardContent, { className: "p-4" },
                                React.createElement("div", { className: "flex items-start justify-between mb-2" },
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "font-semibold" }, review.userName),
                                        React.createElement("p", { className: "text-sm text-muted-foreground" }, review.date)),
                                    React.createElement("div", { className: "flex items-center gap-1" }, __spreadArray([], Array(5), true).map(function (_, i) { return (React.createElement(lucide_react_1.Star, { key: i, className: "h-4 w-4 ".concat(i < review.rating
                                            ? "text-primary fill-primary"
                                            : "text-muted-foreground") })); }))),
                                React.createElement("p", { className: "text-muted-foreground" }, review.comment)))); })))),
                React.createElement("div", { className: "lg:col-span-1" },
                    React.createElement(card_1.Card, { className: "sticky top-24" },
                        React.createElement(card_1.CardHeader, null,
                            React.createElement(card_1.CardTitle, null, "Booking Information")),
                        React.createElement(card_1.CardContent, { className: "space-y-4" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-3xl font-bold text-primary" },
                                    "\u20A6",
                                    hostel.price.toLocaleString()),
                                React.createElement("p", { className: "text-sm text-muted-foreground" }, "per month")),
                            React.createElement(button_1.Button, { className: "w-full", size: "lg" }, "Contact Landlord"),
                            React.createElement(button_1.Button, { className: "w-full", size: "lg", variant: "outline" }, "Save to Bookmarks"))))))));
};
exports.default = HostelDetails;
