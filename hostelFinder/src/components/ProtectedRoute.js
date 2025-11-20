"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/contexts/AuthContext");
var ProtectedRoute = function (_a) {
    var children = _a.children, requiredRole = _a.requiredRole;
    var _b = (0, AuthContext_1.useAuth)(), user = _b.user, userRole = _b.userRole, loading = _b.loading;
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (!loading) {
            if (!user) {
                navigate('/login');
            }
            else if (requiredRole && userRole !== requiredRole) {
                // Redirect to appropriate dashboard based on user's actual role
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
        }
    }, [user, userRole, loading, navigate, requiredRole]);
    if (loading) {
        return (React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" })));
    }
    if (!user || (requiredRole && userRole !== requiredRole)) {
        return null;
    }
    return React.createElement(React.Fragment, null, children);
};
exports.ProtectedRoute = ProtectedRoute;
