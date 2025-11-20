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
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var use_toast_1 = require("@/hooks/use-toast");
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(null), session = _c[0], setSession = _c[1];
    var _d = (0, react_1.useState)(null), userRole = _d[0], setUserRole = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var toast = (0, use_toast_1.useToast)().toast;
    (0, react_1.useEffect)(function () {
        // Set up auth state listener FIRST
        var subscription = client_1.supabase.auth.onAuthStateChange(function (event, session) {
            var _a;
            setSession(session);
            setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
            // Fetch user role when session changes
            if (session === null || session === void 0 ? void 0 : session.user) {
                setTimeout(function () {
                    fetchUserRole(session.user.id);
                }, 0);
            }
            else {
                setUserRole(null);
            }
        }).data.subscription;
        // THEN check for existing session
        client_1.supabase.auth.getSession().then(function (_a) {
            var _b;
            var session = _a.data.session;
            setSession(session);
            setUser((_b = session === null || session === void 0 ? void 0 : session.user) !== null && _b !== void 0 ? _b : null);
            if (session === null || session === void 0 ? void 0 : session.user) {
                fetchUserRole(session.user.id);
            }
            setLoading(false);
        });
        return function () { return subscription.unsubscribe(); };
    }, []);
    var fetchUserRole = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, error, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client_1.supabase
                            .from('user_roles')
                            .select('role')
                            .eq('user_id', userId)
                            .single()];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    setUserRole((data === null || data === void 0 ? void 0 : data.role) || null);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error fetching user role:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var signUp = function (email, password, fullName, role) { return __awaiter(void 0, void 0, void 0, function () {
        var redirectUrl, error, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    redirectUrl = "".concat(window.location.origin, "/");
                    return [4 /*yield*/, client_1.supabase.auth.signUp({
                            email: email,
                            password: password,
                            options: {
                                emailRedirectTo: redirectUrl,
                                data: {
                                    full_name: fullName,
                                    role: role
                                }
                            }
                        })];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    toast({
                        title: "Account created successfully!",
                        description: "Please check your email to verify your account.",
                    });
                    return [2 /*return*/, { error: null }];
                case 2:
                    error_2 = _a.sent();
                    toast({
                        title: "Sign up failed",
                        description: error_2.message,
                        variant: "destructive",
                    });
                    return [2 /*return*/, { error: error_2 }];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var signIn = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var error, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client_1.supabase.auth.signInWithPassword({
                            email: email,
                            password: password,
                        })];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    toast({
                        title: "Login successful",
                        description: "Welcome back to HostelFinder!",
                    });
                    return [2 /*return*/, { error: null }];
                case 2:
                    error_3 = _a.sent();
                    toast({
                        title: "Login failed",
                        description: error_3.message,
                        variant: "destructive",
                    });
                    return [2 /*return*/, { error: error_3 }];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var signOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client_1.supabase.auth.signOut()];
                case 1:
                    _a.sent();
                    toast({
                        title: "Signed out",
                        description: "You have been signed out successfully.",
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    toast({
                        title: "Sign out failed",
                        description: error_4.message,
                        variant: "destructive",
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(AuthContext.Provider, { value: { user: user, session: session, userRole: userRole, loading: loading, signUp: signUp, signIn: signIn, signOut: signOut } }, children));
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
    var context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
