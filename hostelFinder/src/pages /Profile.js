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
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var use_toast_1 = require("@/hooks/use-toast");
var AuthContext_1 = require("@/contexts/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var Profile = function () {
    var _a = (0, react_1.useState)(false), isEditing = _a[0], setIsEditing = _a[1];
    var _b = (0, react_1.useState)(false), isSaving = _b[0], setIsSaving = _b[1];
    var _c = (0, react_1.useState)(""), fullName = _c[0], setFullName = _c[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var _d = (0, AuthContext_1.useAuth)(), user = _d.user, userRole = _d.userRole, signOut = _d.signOut;
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (user) {
            fetchProfile();
        }
    }, [user]);
    var fetchProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    return [4 /*yield*/, client_1.supabase
                            .from('profiles')
                            .select('full_name')
                            .eq('id', user.id)
                            .single()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (data) {
                        setFullName(data.full_name);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    setIsSaving(true);
                    return [4 /*yield*/, client_1.supabase
                            .from('profiles')
                            .update({ full_name: fullName })
                            .eq('id', user.id)];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        toast({
                            title: "Update failed",
                            description: error.message,
                            variant: "destructive",
                        });
                    }
                    else {
                        toast({
                            title: "Profile updated",
                            description: "Your profile has been updated successfully.",
                        });
                        setIsEditing(false);
                    }
                    setIsSaving(false);
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
                    navigate('/login');
                    return [2 /*return*/];
            }
        });
    }); };
    var getRoleBadgeColor = function (role) {
        switch (role) {
            case "admin":
                return "bg-destructive";
            case "landlord":
                return "bg-secondary";
            default:
                return "bg-primary";
        }
    };
    var getDashboardLink = function () {
        if (userRole === 'student')
            return '/student-dashboard';
        if (userRole === 'landlord')
            return '/landlord-dashboard';
        if (userRole === 'admin')
            return '/admin-dashboard';
        return '/';
    };
    return (React.createElement("div", { className: "min-h-screen bg-background" },
        React.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            React.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                React.createElement(react_router_dom_1.Link, { to: "/", className: "flex items-center gap-2" },
                    React.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    React.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")),
                React.createElement(button_1.Button, { variant: "ghost", onClick: handleSignOut },
                    React.createElement(lucide_react_1.LogOut, { className: "h-4 w-4 mr-2" }),
                    "Sign Out"))),
        React.createElement("div", { className: "container mx-auto px-4 py-8 max-w-2xl" },
            React.createElement(react_router_dom_1.Link, { to: getDashboardLink() },
                React.createElement(button_1.Button, { variant: "ghost", className: "mb-6" },
                    React.createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 mr-2" }),
                    "Back to Dashboard")),
            React.createElement(card_1.Card, null,
                React.createElement(card_1.CardHeader, null,
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement(card_1.CardTitle, { className: "text-2xl" }, "Profile Settings"),
                            React.createElement(card_1.CardDescription, null, "Manage your account information")),
                        React.createElement("div", { className: "w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm" },
                            React.createElement(lucide_react_1.User, { className: "h-8 w-8 text-primary" })))),
                React.createElement(card_1.CardContent, { className: "space-y-6" },
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "text-sm text-muted-foreground" }, "Account Type:"),
                        React.createElement(badge_1.Badge, { className: getRoleBadgeColor(userRole || '') }, userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Loading...'),
                        React.createElement("span", { className: "text-xs text-muted-foreground" }, "(cannot be changed)")),
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("div", { className: "space-y-1" },
                            React.createElement(label_1.Label, { htmlFor: "fullName", className: "text-sm font-medium" }, "Full Name"),
                            React.createElement(input_1.Input, { id: "fullName", value: fullName, onChange: function (e) { return setFullName(e.target.value); }, disabled: !isEditing, className: "transition-all duration-200" })),
                        React.createElement("div", null,
                            React.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                            React.createElement(input_1.Input, { id: "email", type: "email", value: (user === null || user === void 0 ? void 0 : user.email) || '', disabled: true }),
                            React.createElement("p", { className: "text-xs text-muted-foreground mt-1" }, "Email cannot be changed after registration"))),
                    React.createElement("div", { className: "flex gap-3 pt-4 border-t border-border" }, !isEditing ? (React.createElement(button_1.Button, { onClick: function () { return setIsEditing(true); }, className: "flex-1" }, "Edit Profile")) : (React.createElement(React.Fragment, null,
                        React.createElement(button_1.Button, { variant: "outline", onClick: function () { return setIsEditing(false); }, className: "flex-1" }, "Cancel"),
                        React.createElement(button_1.Button, { onClick: handleSave, disabled: isSaving, className: "flex-1" }, isSaving ? "Saving..." : "Save Changes")))),
                    React.createElement("div", { className: "pt-4 border-t border-border" },
                        React.createElement("h3", { className: "font-semibold mb-3" }, "Change Password"),
                        React.createElement("div", { className: "space-y-3" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "currentPassword" }, "Current Password"),
                                React.createElement(input_1.Input, { id: "currentPassword", type: "password" })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "newPassword" }, "New Password"),
                                React.createElement(input_1.Input, { id: "newPassword", type: "password" })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "confirmPassword" }, "Confirm New Password"),
                                React.createElement(input_1.Input, { id: "confirmPassword", type: "password" })),
                            React.createElement(button_1.Button, { variant: "secondary" }, "Update Password"))))))));
};
exports.default = Profile;
