"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var AuthContext_1 = require("@/contexts/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var react_1 = require("react");
var use_toast_1 = require("@/hooks/use-toast");
var react_2 = require("react");
var AdminDashboard = function () {
    var signOut = (0, AuthContext_1.useAuth)().signOut;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)([]), pendingListings = _a[0], setPendingListings = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)({
        total: 0,
        pending: 0,
        users: 0,
    }), stats = _c[0], setStats = _c[1];
    (0, react_1.useEffect)(function () {
        fetchData();
    }, []);
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, pending, pendingError, landlordIds, profiles, profileMap_1, listingsWithNames, totalCount, userCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, client_1.supabase
                            .from('hostels')
                            .select("\n        id,\n        name,\n        price,\n        landlord_id,\n        created_at\n      ")
                            .eq('status', 'pending')
                            .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), pending = _a.data, pendingError = _a.error;
                    if (!pendingError) return [3 /*break*/, 2];
                    toast({
                        title: "Error fetching pending listings",
                        description: pendingError.message,
                        variant: "destructive",
                    });
                    return [3 /*break*/, 4];
                case 2:
                    if (!pending) return [3 /*break*/, 4];
                    landlordIds = __spreadArray([], new Set(pending.map(function (l) { return l.landlord_id; })), true);
                    return [4 /*yield*/, client_1.supabase
                            .from('profiles')
                            .select('id, full_name')
                            .in('id', landlordIds)];
                case 3:
                    profiles = (_b.sent()).data;
                    profileMap_1 = new Map(profiles === null || profiles === void 0 ? void 0 : profiles.map(function (p) { return [p.id, p.full_name]; }));
                    listingsWithNames = pending.map(function (l) { return (__assign(__assign({}, l), { landlord_name: profileMap_1.get(l.landlord_id) || 'Unknown' })); });
                    setPendingListings(listingsWithNames);
                    _b.label = 4;
                case 4: return [4 /*yield*/, client_1.supabase
                        .from('hostels')
                        .select('*', { count: 'exact', head: true })];
                case 5:
                    totalCount = (_b.sent()).count;
                    return [4 /*yield*/, client_1.supabase
                            .from('profiles')
                            .select('*', { count: 'exact', head: true })];
                case 6:
                    userCount = (_b.sent()).count;
                    setStats({
                        total: totalCount || 0,
                        pending: (pending === null || pending === void 0 ? void 0 : pending.length) || 0,
                        users: userCount || 0,
                    });
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleApprove = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.supabase
                        .from('hostels')
                        .update({ status: 'approved' })
                        .eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        toast({
                            title: "Approval failed",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                    else {
                        toast({
                            title: "Listing approved",
                            description: "The listing has been approved successfully.",
                        });
                        fetchData();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleReject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.supabase
                        .from('hostels')
                        .update({ status: 'rejected' })
                        .eq('id', id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        toast({
                            title: "Rejection failed",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                    else {
                        toast({
                            title: "Listing rejected",
                            description: "The listing has been rejected.",
                        });
                        fetchData();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSignOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, signOut()];
                case 1:
                    _a.sent();
                    navigate('/');
                    return [2 /*return*/];
            }
        });
    }); };
    var getTimeAgo = function (dateString) {
        var date = new Date(dateString);
        var now = new Date();
        var diffMs = now.getTime() - date.getTime();
        var diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours < 1)
            return 'Less than an hour ago';
        if (diffHours === 1)
            return '1 hour ago';
        if (diffHours < 24)
            return "".concat(diffHours, " hours ago");
        var diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1)
            return '1 day ago';
        return "".concat(diffDays, " days ago");
    };
    var statItems = [
        { icon: lucide_react_1.Home, label: "Total Listings", value: stats.total.toString(), color: "text-primary" },
        { icon: lucide_react_1.Clock, label: "Pending Approval", value: stats.pending.toString(), color: "text-warning" },
        { icon: lucide_react_1.Users, label: "Total Users", value: stats.users.toString(), color: "text-secondary" },
        { icon: lucide_react_1.AlertCircle, label: "Flagged Reviews", value: "0", color: "text-destructive" },
    ];
    return (react_2.default.createElement("div", { className: "min-h-screen bg-background" },
        react_2.default.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            react_2.default.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/admin-dashboard", className: "flex items-center gap-2" },
                    react_2.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    react_2.default.createElement("span", { className: "text-xl font-bold" }, "HostelFinder Admin")),
                react_2.default.createElement("div", { className: "flex items-center gap-3" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: "/profile" },
                        react_2.default.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                            react_2.default.createElement(lucide_react_1.User, { className: "h-5 w-5" }))),
                    react_2.default.createElement(button_1.Button, { variant: "ghost", onClick: handleSignOut },
                        react_2.default.createElement(lucide_react_1.LogOut, { className: "h-4 w-4 mr-2" }),
                        "Logout")))),
        react_2.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_2.default.createElement("div", { className: "mb-8" },
                react_2.default.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Admin Dashboard"),
                react_2.default.createElement("p", { className: "text-muted-foreground" }, "Manage listings, users, and platform content")),
            react_2.default.createElement("div", { className: "grid md:grid-cols-4 gap-6 mb-8" }, statItems.map(function (stat, index) { return (react_2.default.createElement(card_1.Card, { key: index },
                react_2.default.createElement(card_1.CardContent, { className: "p-6" },
                    react_2.default.createElement("div", { className: "flex items-center gap-4" },
                        react_2.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center" },
                            react_2.default.createElement(stat.icon, { className: "h-6 w-6 ".concat(stat.color) })),
                        react_2.default.createElement("div", null,
                            react_2.default.createElement("p", { className: "text-2xl font-bold" }, stat.value),
                            react_2.default.createElement("p", { className: "text-sm text-muted-foreground" }, stat.label)))))); })),
            react_2.default.createElement(tabs_1.Tabs, { defaultValue: "pending", className: "space-y-6" },
                react_2.default.createElement(tabs_1.TabsList, null,
                    react_2.default.createElement(tabs_1.TabsTrigger, { value: "pending" }, "Pending Approvals"),
                    react_2.default.createElement(tabs_1.TabsTrigger, { value: "listings" }, "All Listings"),
                    react_2.default.createElement(tabs_1.TabsTrigger, { value: "users" }, "User Management"),
                    react_2.default.createElement(tabs_1.TabsTrigger, { value: "reports" }, "Reports")),
                react_2.default.createElement(tabs_1.TabsContent, { value: "pending" },
                    react_2.default.createElement(card_1.Card, null,
                        react_2.default.createElement(card_1.CardHeader, null,
                            react_2.default.createElement(card_1.CardTitle, null, "Pending Listing Approvals"),
                            react_2.default.createElement(card_1.CardDescription, null, "Review and approve new hostel listings")),
                        react_2.default.createElement(card_1.CardContent, null, loading ? (react_2.default.createElement("div", { className: "flex justify-center py-8" },
                            react_2.default.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }))) : pendingListings.length === 0 ? (react_2.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, "No pending listings to review")) : (react_2.default.createElement("div", { className: "space-y-4" }, pendingListings.map(function (listing) { return (react_2.default.createElement("div", { key: listing.id, className: "flex items-center gap-4 p-4 border border-border rounded-lg" },
                            react_2.default.createElement("div", { className: "w-20 h-20 rounded-lg bg-muted flex-shrink-0" }),
                            react_2.default.createElement("div", { className: "flex-1" },
                                react_2.default.createElement("h3", { className: "font-semibold text-lg" }, listing.name),
                                react_2.default.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "by ",
                                    listing.landlord_name),
                                react_2.default.createElement("p", { className: "text-sm text-muted-foreground" },
                                    "\u20A6",
                                    listing.price.toLocaleString(),
                                    "/month")),
                            react_2.default.createElement("div", { className: "flex flex-col gap-2 items-end" },
                                react_2.default.createElement(badge_1.Badge, { variant: "secondary" },
                                    react_2.default.createElement(lucide_react_1.Clock, { className: "h-3 w-3 mr-1" }),
                                    getTimeAgo(listing.created_at)),
                                react_2.default.createElement("div", { className: "flex gap-2" },
                                    react_2.default.createElement(react_router_dom_1.Link, { to: "/hostel/".concat(listing.id) },
                                        react_2.default.createElement(button_1.Button, { size: "sm", variant: "outline" }, "View Details")),
                                    react_2.default.createElement(button_1.Button, { size: "sm", className: "bg-success hover:bg-success/90", onClick: function () { return handleApprove(listing.id); } },
                                        react_2.default.createElement(lucide_react_1.CheckCircle, { className: "h-4 w-4 mr-1" }),
                                        "Approve"),
                                    react_2.default.createElement(button_1.Button, { size: "sm", variant: "destructive", onClick: function () { return handleReject(listing.id); } },
                                        react_2.default.createElement(lucide_react_1.XCircle, { className: "h-4 w-4 mr-1" }),
                                        "Reject"))))); })))))),
                react_2.default.createElement(tabs_1.TabsContent, { value: "listings" },
                    react_2.default.createElement(card_1.Card, null,
                        react_2.default.createElement(card_1.CardHeader, null,
                            react_2.default.createElement(card_1.CardTitle, null, "All Listings"),
                            react_2.default.createElement(card_1.CardDescription, null, "View and manage all hostel listings on the platform")),
                        react_2.default.createElement(card_1.CardContent, null,
                            react_2.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, "Listing management interface coming soon...")))),
                react_2.default.createElement(tabs_1.TabsContent, { value: "users" },
                    react_2.default.createElement(card_1.Card, null,
                        react_2.default.createElement(card_1.CardHeader, null,
                            react_2.default.createElement(card_1.CardTitle, null, "User Management"),
                            react_2.default.createElement(card_1.CardDescription, null, "Manage student and landlord accounts")),
                        react_2.default.createElement(card_1.CardContent, null,
                            react_2.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, "User management interface coming soon...")))),
                react_2.default.createElement(tabs_1.TabsContent, { value: "reports" },
                    react_2.default.createElement(card_1.Card, null,
                        react_2.default.createElement(card_1.CardHeader, null,
                            react_2.default.createElement(card_1.CardTitle, null, "Flagged Content"),
                            react_2.default.createElement(card_1.CardDescription, null, "Review reported listings and reviews")),
                        react_2.default.createElement(card_1.CardContent, null,
                            react_2.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, "Reports interface coming soon..."))))))));
};
exports.default = AdminDashboard;
