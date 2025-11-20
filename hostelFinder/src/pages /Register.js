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
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var AuthContext_1 = require("@/contexts/AuthContext");
var Register = function () {
    var _a = (0, react_1.useState)(null), role = _a[0], setRole = _a[1];
    var _b = (0, react_1.useState)(""), fullName = _b[0], setFullName = _b[1];
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(""), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setIsLoading = _f[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _g = (0, AuthContext_1.useAuth)(), signUp = _g.signUp, user = _g.user, userRole = _g.userRole;
    (0, react_1.useEffect)(function () {
        // Redirect if already logged in
        if (user && userRole) {
            if (userRole === 'student') {
                navigate('/student-dashboard');
            }
            else if (userRole === 'landlord') {
                navigate('/landlord-dashboard');
            }
            else if (userRole === 'admin') {
                navigate('/admin-dashboard');
            }
        }
    }, [user, userRole, navigate]);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!role)
                        return [2 /*return*/];
                    if (password !== confirmPassword) {
                        return [2 /*return*/];
                    }
                    if (password.length < 6) {
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    return [4 /*yield*/, signUp(email, password, fullName, role)];
                case 1:
                    error = (_a.sent()).error;
                    if (!error) {
                        // Show success message and stay on the page
                        // User needs to verify email before they can log in
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    if (!role) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4" },
            React.createElement(card_1.Card, { className: "w-full max-w-2xl" },
                React.createElement(card_1.CardHeader, { className: "space-y-3 text-center" },
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" },
                            React.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }))),
                    React.createElement(card_1.CardTitle, { className: "text-2xl" }, "Join HostelFinder"),
                    React.createElement(card_1.CardDescription, null, "Choose your account type to get started")),
                React.createElement(card_1.CardContent, null,
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
                        React.createElement("button", { onClick: function () { return setRole("student"); }, className: "group relative p-6 border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all text-left" },
                            React.createElement("div", { className: "flex flex-col items-start gap-3" },
                                React.createElement("div", { className: "w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors" },
                                    React.createElement(lucide_react_1.UserCircle, { className: "h-6 w-6 text-primary" })),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "I'm a Student"),
                                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "Search for hostels, read reviews, and bookmark your favorites")))),
                        React.createElement("button", { onClick: function () { return setRole("landlord"); }, className: "group relative p-6 border-2 border-border rounded-lg hover:border-secondary hover:shadow-lg transition-all text-left" },
                            React.createElement("div", { className: "flex flex-col items-start gap-3" },
                                React.createElement("div", { className: "w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 flex items-center justify-center transition-colors" },
                                    React.createElement(lucide_react_1.Home, { className: "h-6 w-6 text-secondary" })),
                                React.createElement("div", null,
                                    React.createElement("h3", { className: "text-xl font-semibold mb-2" }, "I'm a Landlord"),
                                    React.createElement("p", { className: "text-sm text-muted-foreground" }, "List your hostels and reach verified students"))))),
                    React.createElement("div", { className: "mt-6 text-center text-sm text-muted-foreground" },
                        "Already have an account?",
                        " ",
                        React.createElement(react_router_dom_1.Link, { to: "/login", className: "text-primary font-medium hover:underline" }, "Sign in"))))));
    }
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4" },
        React.createElement(card_1.Card, { className: "w-full max-w-md" },
            React.createElement(card_1.CardHeader, { className: "space-y-3 text-center" },
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" }, role === "student" ? (React.createElement(lucide_react_1.UserCircle, { className: "h-6 w-6 text-primary" })) : (React.createElement(lucide_react_1.Home, { className: "h-6 w-6 text-secondary" })))),
                React.createElement(card_1.CardTitle, { className: "text-2xl" },
                    "Create ",
                    role === "student" ? "Student" : "Landlord",
                    " Account"),
                React.createElement(card_1.CardDescription, null, "Fill in your details to get started")),
            React.createElement(card_1.CardContent, { className: "space-y-4" },
                React.createElement(alert_1.Alert, null,
                    React.createElement(alert_1.AlertDescription, { className: "text-sm" },
                        React.createElement("strong", null, "Note:"),
                        " Your email and role cannot be changed after registration.")),
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "fullName" }, "Full Name"),
                        React.createElement(input_1.Input, { id: "fullName", type: "text", placeholder: "John Doe", value: fullName, onChange: function (e) { return setFullName(e.target.value); }, required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                        React.createElement(input_1.Input, { id: "email", type: "email", placeholder: "your.email@university.edu", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "password" }, "Password"),
                        React.createElement(input_1.Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true, minLength: 8 })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "confirmPassword" }, "Confirm Password"),
                        React.createElement(input_1.Input, { id: "confirmPassword", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: confirmPassword, onChange: function (e) { return setConfirmPassword(e.target.value); }, required: true, minLength: 8 })),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement(button_1.Button, { type: "button", variant: "outline", className: "w-full", onClick: function () { return setRole(null); } }, "Back"),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? "Creating account..." : "Create Account")))))));
};
exports.default = Register;
