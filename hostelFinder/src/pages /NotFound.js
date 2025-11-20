"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var NotFound = function () {
    var location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(function () {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (React.createElement("div", { className: "flex min-h-screen items-center justify-center bg-muted" },
        React.createElement("div", { className: "text-center" },
            React.createElement("h1", { className: "mb-4 text-4xl font-bold" }, "404"),
            React.createElement("p", { className: "mb-4 text-xl text-muted-foreground" }, "Oops! Page not found"),
            React.createElement("a", { href: "/", className: "text-primary underline hover:text-primary/90" }, "Return to Home"))));
};
exports.default = NotFound;
