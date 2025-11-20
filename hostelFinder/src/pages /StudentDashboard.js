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
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/contexts/AuthContext");
var badge_1 = require("@/components/ui/badge");
var react_2 = require("react");
var StudentDashboard = function () {
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)([]), bookmarkedHostels = _a[0], setBookmarkedHostels = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var quickActions = [
        { icon: lucide_react_1.Search, label: "Search Hostels", link: "/listings", color: "text-primary" },
        { icon: lucide_react_1.Bookmark, label: "Bookmarks", link: "/bookmarks", color: "text-secondary" },
        { icon: lucide_react_1.MessageSquare, label: "My Reviews", link: "/my-reviews", color: "text-accent" },
    ];
    (0, react_1.useEffect)(function () {
        if (user) {
            fetchBookmarkedHostels();
            // Set up real-time subscription
            var channel_1 = client_1.supabase
                .channel('dashboard-bookmarks')
                .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'bookmarks',
                filter: "student_id=eq.".concat(user.id)
            }, function () {
                fetchBookmarkedHostels();
            })
                .subscribe();
            return function () {
                client_1.supabase.removeChannel(channel_1);
            };
        }
    }, [user]);
    var fetchBookmarkedHostels = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, bookmarks, error, formatted, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, client_1.supabase
                            .from('bookmarks')
                            .select("\n          hostel_id,\n          hostels (\n            id,\n            name,\n            price,\n            address,\n            hostel_images (\n              image_url,\n              display_order\n            ),\n            reviews (\n              rating\n            )\n          )\n        ")
                            .eq('student_id', user.id)
                            .order('created_at', { ascending: false })
                            .limit(3)];
                case 2:
                    _a = _b.sent(), bookmarks = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    formatted = (bookmarks || [])
                        .filter(function (b) { return b.hostels; })
                        .map(function (bookmark) {
                        var _a, _b, _c;
                        var hostel = bookmark.hostels;
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
                            image_url: ((_c = sortedImages === null || sortedImages === void 0 ? void 0 : sortedImages[0]) === null || _c === void 0 ? void 0 : _c.image_url) || null,
                            avg_rating: avgRating
                        };
                    });
                    setBookmarkedHostels(formatted);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error fetching bookmarked hostels:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_2.default.createElement("div", { className: "min-h-screen bg-background" },
        react_2.default.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            react_2.default.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/student-dashboard", className: "flex items-center gap-2" },
                    react_2.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    react_2.default.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")),
                react_2.default.createElement("div", { className: "flex items-center gap-3" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: "/listings" },
                        react_2.default.createElement(button_1.Button, { variant: "ghost" }, "Browse")),
                    react_2.default.createElement(react_router_dom_1.Link, { to: "/profile" },
                        react_2.default.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                            react_2.default.createElement(lucide_react_1.User, { className: "h-5 w-5" })))))),
        react_2.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_2.default.createElement("div", { className: "mb-8" },
                react_2.default.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Welcome back, Student!"),
                react_2.default.createElement("p", { className: "text-muted-foreground" }, "Find your perfect accommodation near campus")),
            react_2.default.createElement(card_1.Card, { className: "mb-8" },
                react_2.default.createElement(card_1.CardHeader, null,
                    react_2.default.createElement(card_1.CardTitle, null, "Quick Search"),
                    react_2.default.createElement(card_1.CardDescription, null, "Search for hostels by name, location, or amenities")),
                react_2.default.createElement(card_1.CardContent, null,
                    react_2.default.createElement("div", { className: "flex gap-2" },
                        react_2.default.createElement(input_1.Input, { placeholder: "Search hostels...", className: "flex-1" }),
                        react_2.default.createElement(react_router_dom_1.Link, { to: "/listings" },
                            react_2.default.createElement(button_1.Button, null,
                                react_2.default.createElement(lucide_react_1.Search, { className: "h-4 w-4 mr-2" }),
                                "Search"))))),
            react_2.default.createElement("div", { className: "grid md:grid-cols-3 gap-6 mb-8" }, quickActions.map(function (action, index) { return (react_2.default.createElement(react_router_dom_1.Link, { key: index, to: action.link },
                react_2.default.createElement(card_1.Card, { className: "hover:shadow-lg transition-shadow cursor-pointer" },
                    react_2.default.createElement(card_1.CardContent, { className: "p-6 flex items-center gap-4" },
                        react_2.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center ".concat(action.color) },
                            react_2.default.createElement(action.icon, { className: "h-6 w-6" })),
                        react_2.default.createElement("span", { className: "font-semibold text-lg" }, action.label))))); })),
            react_2.default.createElement("div", { className: "grid md:grid-cols-2 gap-6" },
                react_2.default.createElement(card_1.Card, null,
                    react_2.default.createElement(card_1.CardHeader, null,
                        react_2.default.createElement(card_1.CardTitle, null, "Recent Searches")),
                    react_2.default.createElement(card_1.CardContent, null,
                        react_2.default.createElement("div", { className: "text-sm text-muted-foreground text-center py-8" }, "No recent searches yet. Start exploring hostels!"))),
                react_2.default.createElement(card_1.Card, null,
                    react_2.default.createElement(card_1.CardHeader, null,
                        react_2.default.createElement(card_1.CardTitle, null, "Bookmarked Hostels")),
                    react_2.default.createElement(card_1.CardContent, null, loading ? (react_2.default.createElement("div", { className: "text-center py-8" },
                        react_2.default.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }))) : bookmarkedHostels.length === 0 ? (react_2.default.createElement("div", { className: "text-sm text-muted-foreground text-center py-8" }, "No bookmarks yet. Save your favorite hostels to view them here.")) : (react_2.default.createElement("div", { className: "space-y-4" },
                        bookmarkedHostels.map(function (hostel) { return (react_2.default.createElement(react_router_dom_1.Link, { key: hostel.id, to: "/hostel/".concat(hostel.id) },
                            react_2.default.createElement("div", { className: "flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors" },
                                react_2.default.createElement("div", { className: "w-20 h-20 rounded bg-muted flex-shrink-0 overflow-hidden" }, hostel.image_url ? (react_2.default.createElement("img", { src: hostel.image_url, alt: hostel.name, className: "w-full h-full object-cover" })) : (react_2.default.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                                    react_2.default.createElement(lucide_react_1.Building2, { className: "h-8 w-8 text-muted-foreground" })))),
                                react_2.default.createElement("div", { className: "flex-1 min-w-0" },
                                    react_2.default.createElement("div", { className: "flex items-start justify-between gap-2" },
                                        react_2.default.createElement("h4", { className: "font-semibold truncate" }, hostel.name),
                                        hostel.avg_rating && (react_2.default.createElement(badge_1.Badge, { variant: "secondary", className: "flex-shrink-0" },
                                            react_2.default.createElement(lucide_react_1.Star, { className: "h-3 w-3 mr-1 fill-primary text-primary" }),
                                            hostel.avg_rating.toFixed(1)))),
                                    react_2.default.createElement("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-1" },
                                        react_2.default.createElement(lucide_react_1.MapPin, { className: "h-3 w-3" }),
                                        react_2.default.createElement("span", { className: "truncate" }, hostel.address)),
                                    react_2.default.createElement("p", { className: "text-primary font-bold mt-2" },
                                        "\u20A6",
                                        hostel.price.toLocaleString(),
                                        "/mo"))))); }),
                        react_2.default.createElement(react_router_dom_1.Link, { to: "/listings" },
                            react_2.default.createElement(button_1.Button, { variant: "outline", className: "w-full" }, "View All Bookmarks"))))))))));
};
exports.default = StudentDashboard;
