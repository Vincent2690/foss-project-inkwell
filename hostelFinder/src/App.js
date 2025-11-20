"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toaster_1 = require("@/components/ui/toaster");
var sonner_1 = require("@/components/ui/sonner");
var tooltip_1 = require("@/components/ui/tooltip");
var react_query_1 = require("@tanstack/react-query");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("./contexts/AuthContext");
var ProtectedRoute_1 = require("./components/ProtectedRoute");
var Index_1 = require("./pages /Index");
var Login_1 = require("./pages /Login");
var Register_1 = require("./pages /Register");
var StudentDashboard_1 = require("./pages /StudentDashboard");
var LandlordDashboard_1 = require("./pages /LandlordDashboard");
var AdminDashboard_1 = require("./pages /AdminDashboard");
var Listings_1 = require("./pages /Listings");
var HostelDetails_1 = require("./pages /HostelDetails");
var CreateListing_1 = require("./pages /CreateListing");
var Profile_1 = require("./pages /Profile");
var NotFound_1 = require("./pages /NotFound");
var react_1 = require("react");
var queryClient = new react_query_1.QueryClient();
var App = function () { return (react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient },
    react_1.default.createElement(AuthContext_1.AuthProvider, null,
        react_1.default.createElement(tooltip_1.TooltipProvider, null,
            react_1.default.createElement(toaster_1.Toaster, null),
            react_1.default.createElement(sonner_1.Toaster, null),
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Index_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/register", element: react_1.default.createElement(Register_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/student-dashboard", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { requiredRole: "student" },
                            react_1.default.createElement(StudentDashboard_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/landlord-dashboard", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { requiredRole: "landlord" },
                            react_1.default.createElement(LandlordDashboard_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/admin-dashboard", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { requiredRole: "admin" },
                            react_1.default.createElement(AdminDashboard_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/listings", element: react_1.default.createElement(Listings_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/hostel/:id", element: react_1.default.createElement(HostelDetails_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/create-listing", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, { requiredRole: "landlord" },
                            react_1.default.createElement(CreateListing_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/profile", element: react_1.default.createElement(ProtectedRoute_1.ProtectedRoute, null,
                            react_1.default.createElement(Profile_1.default, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(NotFound_1.default, null) }))))))); };
exports.default = App;
