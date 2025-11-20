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
var badge_1 = require("@/components/ui/badge");
var AuthContext_1 = require("@/contexts/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var react_1 = require("react");
var use_toast_1 = require("@/hooks/use-toast");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var react_2 = require("react");
var LandlordDashboard = function () {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, signOut = _a.signOut;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)([]), listings = _b[0], setListings = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), deleteId = _d[0], setDeleteId = _d[1];
    (0, react_1.useEffect)(function () {
        if (user) {
            fetchListings();
        }
    }, [user]);
    var fetchListings = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    setLoading(true);
                    return [4 /*yield*/, client_1.supabase
                            .from('hostels')
                            .select('id, name, price, status')
                            .eq('landlord_id', user.id)
                            .order('created_at', { ascending: false })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        toast({
                            title: "Error fetching listings",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                    else {
                        setListings(data || []);
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!deleteId)
                        return [2 /*return*/];
                    return [4 /*yield*/, client_1.supabase
                            .from('hostels')
                            .delete()
                            .eq('id', deleteId)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        toast({
                            title: "Delete failed",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                    else {
                        toast({
                            title: "Listing deleted",
                            description: "Your listing has been deleted successfully.",
                        });
                        fetchListings();
                    }
                    setDeleteId(null);
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
    var getStatusBadge = function (status) {
        switch (status) {
            case "approved":
                return react_2.default.createElement(badge_1.Badge, { className: "bg-success" },
                    react_2.default.createElement(lucide_react_1.CheckCircle, { className: "h-3 w-3 mr-1" }),
                    "Approved");
            case "pending":
                return react_2.default.createElement(badge_1.Badge, { variant: "secondary" },
                    react_2.default.createElement(lucide_react_1.Clock, { className: "h-3 w-3 mr-1" }),
                    "Pending");
            case "rejected":
                return react_2.default.createElement(badge_1.Badge, { variant: "destructive" },
                    react_2.default.createElement(lucide_react_1.XCircle, { className: "h-3 w-3 mr-1" }),
                    "Rejected");
            default:
                return null;
        }
    };
    var stats = {
        total: listings.length,
        approved: listings.filter(function (l) { return l.status === 'approved'; }).length,
        pending: listings.filter(function (l) { return l.status === 'pending'; }).length,
    };
    return (react_2.default.createElement("div", { className: "min-h-screen bg-background" },
        react_2.default.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            react_2.default.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/landlord-dashboard", className: "flex items-center gap-2" },
                    react_2.default.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    react_2.default.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")),
                react_2.default.createElement("div", { className: "flex items-center gap-3" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: "/profile" },
                        react_2.default.createElement(button_1.Button, { variant: "ghost", size: "icon" },
                            react_2.default.createElement(lucide_react_1.User, { className: "h-5 w-5" }))),
                    react_2.default.createElement(button_1.Button, { variant: "ghost", onClick: handleSignOut },
                        react_2.default.createElement(lucide_react_1.LogOut, { className: "h-4 w-4 mr-2" }),
                        "Logout")))),
        react_2.default.createElement("div", { className: "container mx-auto px-4 py-8" },
            react_2.default.createElement("div", { className: "mb-8 flex items-center justify-between" },
                react_2.default.createElement("div", null,
                    react_2.default.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Landlord Dashboard"),
                    react_2.default.createElement("p", { className: "text-muted-foreground" }, "Manage your hostel listings")),
                react_2.default.createElement(react_router_dom_1.Link, { to: "/create-listing" },
                    react_2.default.createElement(button_1.Button, { size: "lg" },
                        react_2.default.createElement(lucide_react_1.Plus, { className: "h-5 w-5 mr-2" }),
                        "Add New Listing"))),
            react_2.default.createElement("div", { className: "grid md:grid-cols-3 gap-6 mb-8" },
                react_2.default.createElement(card_1.Card, null,
                    react_2.default.createElement(card_1.CardContent, { className: "p-6" },
                        react_2.default.createElement("div", { className: "flex items-center gap-4" },
                            react_2.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" },
                                react_2.default.createElement(lucide_react_1.Home, { className: "h-6 w-6 text-primary" })),
                            react_2.default.createElement("div", null,
                                react_2.default.createElement("p", { className: "text-2xl font-bold" }, stats.total),
                                react_2.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Total Listings"))))),
                react_2.default.createElement(card_1.Card, null,
                    react_2.default.createElement(card_1.CardContent, { className: "p-6" },
                        react_2.default.createElement("div", { className: "flex items-center gap-4" },
                            react_2.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center" },
                                react_2.default.createElement(lucide_react_1.CheckCircle, { className: "h-6 w-6 text-success" })),
                            react_2.default.createElement("div", null,
                                react_2.default.createElement("p", { className: "text-2xl font-bold" }, stats.approved),
                                react_2.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Approved"))))),
                react_2.default.createElement(card_1.Card, null,
                    react_2.default.createElement(card_1.CardContent, { className: "p-6" },
                        react_2.default.createElement("div", { className: "flex items-center gap-4" },
                            react_2.default.createElement("div", { className: "w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center" },
                                react_2.default.createElement(lucide_react_1.Clock, { className: "h-6 w-6 text-warning" })),
                            react_2.default.createElement("div", null,
                                react_2.default.createElement("p", { className: "text-2xl font-bold" }, stats.pending),
                                react_2.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Pending")))))),
            react_2.default.createElement(card_1.Card, null,
                react_2.default.createElement(card_1.CardHeader, null,
                    react_2.default.createElement(card_1.CardTitle, null, "My Listings"),
                    react_2.default.createElement(card_1.CardDescription, null, "View and manage all your hostel listings")),
                react_2.default.createElement(card_1.CardContent, null, loading ? (react_2.default.createElement("div", { className: "flex justify-center py-8" },
                    react_2.default.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }))) : listings.length === 0 ? (react_2.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, "No listings yet. Create your first listing to get started!")) : (react_2.default.createElement("div", { className: "space-y-4" }, listings.map(function (listing) { return (react_2.default.createElement("div", { key: listing.id, className: "flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow" },
                    react_2.default.createElement("div", { className: "w-20 h-20 rounded-lg bg-muted flex-shrink-0" }),
                    react_2.default.createElement("div", { className: "flex-1" },
                        react_2.default.createElement("h3", { className: "font-semibold text-lg" }, listing.name),
                        react_2.default.createElement("p", { className: "text-muted-foreground" },
                            "\u20A6",
                            listing.price.toLocaleString(),
                            "/month")),
                    react_2.default.createElement("div", { className: "flex items-center gap-3" },
                        getStatusBadge(listing.status),
                        react_2.default.createElement(react_router_dom_1.Link, { to: "/hostel/".concat(listing.id) },
                            react_2.default.createElement(button_1.Button, { variant: "outline", size: "sm" },
                                react_2.default.createElement(lucide_react_1.Edit, { className: "h-4 w-4 mr-1" }),
                                "View")),
                        react_2.default.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setDeleteId(listing.id); } },
                            react_2.default.createElement(lucide_react_1.Trash2, { className: "h-4 w-4 mr-1" }),
                            "Delete")))); })))))),
        react_2.default.createElement(alert_dialog_1.AlertDialog, { open: !!deleteId, onOpenChange: function () { return setDeleteId(null); } },
            react_2.default.createElement(alert_dialog_1.AlertDialogContent, null,
                react_2.default.createElement(alert_dialog_1.AlertDialogHeader, null,
                    react_2.default.createElement(alert_dialog_1.AlertDialogTitle, null, "Delete Listing"),
                    react_2.default.createElement(alert_dialog_1.AlertDialogDescription, null, "Are you sure you want to delete this listing? This action cannot be undone.")),
                react_2.default.createElement(alert_dialog_1.AlertDialogFooter, null,
                    react_2.default.createElement(alert_dialog_1.AlertDialogCancel, null, "Cancel"),
                    react_2.default.createElement(alert_dialog_1.AlertDialogAction, { onClick: handleDelete, className: "bg-destructive hover:bg-destructive/90" }, "Delete"))))));
};
exports.default = LandlordDashboard;
