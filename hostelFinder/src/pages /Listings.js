"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/contexts/AuthContext");
var useBookmarks_1 = require("@/hooks/useBookmarks");
var react_2 = require("react");
var Listings = function () {
    var _a = (0, react_1.useState)(""), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = (0, react_1.useState)([]), listings = _b[0], setListings = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, AuthContext_1.useAuth)(), user = _d.user, userRole = _d.userRole;
    var _e = (0, useBookmarks_1.useBookmarks)(), toggleBookmark = _e.toggleBookmark, isBookmarked = _e.isBookmarked;
    (0, react_1.useEffect)(function () {
        fetchListings();
    }, []);
    var fetchListings = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, hostels, error, formattedListings, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, client_1.supabase
                            .from('hostels')
                            .select("\n          id,\n          name,\n          price,\n          address,\n          amenities,\n          description,\n          hostel_images (\n            image_url,\n            display_order\n          ),\n          reviews (\n            rating\n          )\n        ")
                            .eq('status', 'approved')
                            .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), hostels = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    formattedListings = (hostels || []).map(function (hostel) {
                        var _a, _b, _c;
                        var ratings = ((_a = hostel.reviews) === null || _a === void 0 ? void 0 : _a.map(function (r) { return r.rating; })) || [];
                        var avgRating = ratings.length > 0
                            ? ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length
                            : null;
                        var sortedImages = (_b = hostel.hostel_images) === null || _b === void 0 ? void 0 : _b.sort(function (a, b) { return (a.display_order || 0) - (b.display_order || 0); });
                        return {
                            id: hostel.id,
                            name: hostel.name,
                            price: Number(hostel.price),
                            address: hostel.address,
                            amenities: hostel.amenities || [],
                            description: hostel.description,
                            image_url: ((_c = sortedImages === null || sortedImages === void 0 ? void 0 : sortedImages[0]) === null || _c === void 0 ? void 0 : _c.image_url) || null,
                            avg_rating: avgRating,
                            review_count: ratings.length
                        };
                    });
                    setListings(formattedListings);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error fetching listings:', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var filteredListings = listings.filter(function (listing) {
        return listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.amenities.some(function (a) { return a.toLowerCase().includes(searchQuery.toLowerCase()); });
    });
    return (react_2.default.createElement("div", { className: "min-h-screen bg-background" },
        react_2.default.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            react_2.default.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/", className: "flex items-center gap-2" },
                    react_2.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    react_2.default.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")),
                react_2.default.createElement("div", { className: "flex items-center gap-3" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: "/login" },
                        react_2.default.createElement(button_1.Button, { variant: "ghost" }, "Login"))))),
        react_2.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_2.default.createElement("div", { className: "mb-8" },
                react_2.default.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Browse Hostels"),
                react_2.default.createElement("p", { className: "text-muted-foreground" }, "Find your perfect student accommodation")),
            react_2.default.createElement("div", { className: "flex flex-col md:flex-row gap-4 mb-8" },
                react_2.default.createElement("div", { className: "flex-1 relative" },
                    react_2.default.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }),
                    react_2.default.createElement(input_1.Input, { placeholder: "Search by name, location, or amenities...", className: "pl-10", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); } })),
                react_2.default.createElement(button_1.Button, { variant: "outline", className: "md:w-auto" },
                    react_2.default.createElement(lucide_react_1.Filter, { className: "h-4 w-4 mr-2" }),
                    "Filters")),
            react_2.default.createElement("div", { className: "mb-6" }),
            react_2.default.createElement("p", { className: "text-sm text-muted-foreground" }, loading ? "Loading..." : "".concat(filteredListings.length, " hostels found"))),
        loading ? (react_2.default.createElement("div", { className: "text-center py-16" },
            react_2.default.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }))) : (react_2.default.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6" }, filteredListings.map(function (listing) { return (react_2.default.createElement(card_1.Card, { key: listing.id, className: "hover:shadow-lg transition-shadow overflow-hidden group relative" },
            react_2.default.createElement(react_router_dom_1.Link, { to: "/hostel/".concat(listing.id) },
                react_2.default.createElement("div", { className: "aspect-video bg-muted relative overflow-hidden" },
                    listing.image_url ? (react_2.default.createElement("img", { src: listing.image_url, alt: listing.name, className: "w-full h-full object-cover" })) : (react_2.default.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                        react_2.default.createElement(lucide_react_1.Building2, { className: "h-16 w-16 text-muted-foreground" }))),
                    react_2.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }))),
            user && userRole === 'student' && (react_2.default.createElement(button_1.Button, { size: "icon", variant: "secondary", className: "absolute top-2 right-2 z-10", onClick: function (e) {
                    e.preventDefault();
                    toggleBookmark(listing.id);
                } },
                react_2.default.createElement(lucide_react_1.Bookmark, { className: "h-4 w-4 ".concat(isBookmarked(listing.id) ? 'fill-primary text-primary' : '') }))),
            react_2.default.createElement(react_router_dom_1.Link, { to: "/hostel/".concat(listing.id) },
                react_2.default.createElement(card_1.CardContent, { className: "p-4 space-y-3" },
                    react_2.default.createElement("div", { className: "flex items-start justify-between" },
                        react_2.default.createElement("h3", { className: "font-semibold text-lg leading-tight" }, listing.name),
                        listing.avg_rating && (react_2.default.createElement("div", { className: "flex items-center gap-1 bg-primary/10 px-2 py-1 rounded" },
                            react_2.default.createElement(lucide_react_1.Star, { className: "h-4 w-4 text-primary fill-primary" }),
                            react_2.default.createElement("span", { className: "text-sm font-medium" }, listing.avg_rating.toFixed(1))))),
                    react_2.default.createElement("div", { className: "flex items-start gap-2 text-sm text-muted-foreground" },
                        react_2.default.createElement(lucide_react_1.MapPin, { className: "h-4 w-4 mt-0.5 flex-shrink-0" }),
                        react_2.default.createElement("span", null, listing.address)),
                    react_2.default.createElement("div", { className: "flex flex-wrap gap-2" }, listing.amenities.slice(0, 3).map(function (amenity, index) { return (react_2.default.createElement(badge_1.Badge, { key: index, variant: "secondary", className: "text-xs" }, amenity)); })),
                    react_2.default.createElement("div", { className: "flex items-center justify-between pt-2 border-t border-border" },
                        react_2.default.createElement("div", null,
                            react_2.default.createElement("p", { className: "text-2xl font-bold text-primary" },
                                "\u20A6",
                                listing.price.toLocaleString()),
                            react_2.default.createElement("p", { className: "text-xs text-muted-foreground" }, "per month")),
                        react_2.default.createElement(button_1.Button, { size: "sm" }, "View Details")))))); }))),
        !loading && filteredListings.length === 0 && (react_2.default.createElement("div", { className: "text-center py-16" },
            react_2.default.createElement("div", { className: "w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center" },
                react_2.default.createElement(lucide_react_1.Search, { className: "h-8 w-8 text-muted-foreground" })),
            react_2.default.createElement("h3", { className: "text-xl font-semibold mb-2" }, "No hostels found"),
            react_2.default.createElement("p", { className: "text-muted-foreground" }, "Try adjusting your search or filters")))));
};
exports.default = Listings;
