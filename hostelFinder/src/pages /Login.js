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
var AuthContext_1 = require("@/contexts/AuthContext");
var Login = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _d = (0, AuthContext_1.useAuth)(), signIn = _d.signIn, user = _d.user, userRole = _d.userRole;
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
                    setIsLoading(true);
                    return [4 /*yield*/, signIn(email, password)];
                case 1:
                    error = (_a.sent()).error;
                    if (!error) {
                        // Navigation will be handled by the useEffect after auth state updates
                    }
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4" },
        React.createElement(card_1.Card, { className: "w-full max-w-md" },
            React.createElement(card_1.CardHeader, { className: "space-y-3 text-center" },
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center" },
                        React.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }))),
                React.createElement(card_1.CardTitle, { className: "text-2xl" }, "Welcome Back"),
                React.createElement(card_1.CardDescription, null, "Sign in to your HostelFinder account")),
            React.createElement(card_1.CardContent, null,
                React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                        React.createElement(input_1.Input, { id: "email", type: "email", placeholder: "your.email@university.edu", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("div", { className: "flex items-center justify-between" },
                            React.createElement(label_1.Label, { htmlFor: "password" }, "Password"),
                            React.createElement(react_router_dom_1.Link, { to: "/forgot-password", className: "text-sm text-primary hover:underline" }, "Forgot password?")),
                        React.createElement(input_1.Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true })),
                    React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? "Signing in..." : "Sign In")),
                React.createElement("div", { className: "mt-6 text-center text-sm text-muted-foreground" },
                    "Don't have an account?",
                    " ",
                    React.createElement(react_router_dom_1.Link, { to: "/register", className: "text-primary font-medium hover:underline" }, "Sign up"))))));
};
exports.default = Login;
