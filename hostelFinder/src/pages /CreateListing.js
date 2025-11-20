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
var textarea_1 = require("@/components/ui/textarea");
var card_1 = require("@/components/ui/card");
var checkbox_1 = require("@/components/ui/checkbox");
var use_toast_1 = require("@/hooks/use-toast");
var CreateListing = function () {
    var _a = (0, react_1.useState)(false), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var toast = (0, use_toast_1.useToast)().toast;
    var amenitiesList = [
        "WiFi",
        "Kitchen",
        "Laundry",
        "Parking",
        "Gym",
        "Study Room",
        "24/7 Security",
        "Backup Generator"
    ];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            setIsSubmitting(true);
            // Simulate submission
            setTimeout(function () {
                toast({
                    title: "Listing submitted successfully",
                    description: "Your hostel listing is now pending admin approval.",
                });
                navigate("/landlord-dashboard");
                setIsSubmitting(false);
            }, 1500);
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen bg-background" },
        React.createElement("nav", { className: "border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50" },
            React.createElement("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between" },
                React.createElement(react_router_dom_1.Link, { to: "/", className: "flex items-center gap-2" },
                    React.createElement(lucide_react_1.Building2, { className: "h-6 w-6 text-primary" }),
                    React.createElement("span", { className: "text-xl font-bold" }, "HostelFinder")))),
        React.createElement("div", { className: "container mx-auto px-4 py-8 max-w-3xl" },
            React.createElement(react_router_dom_1.Link, { to: "/landlord-dashboard" },
                React.createElement(button_1.Button, { variant: "ghost", className: "mb-6" },
                    React.createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 mr-2" }),
                    "Back to Dashboard")),
            React.createElement(card_1.Card, null,
                React.createElement(card_1.CardHeader, null,
                    React.createElement(card_1.CardTitle, { className: "text-2xl" }, "Create New Listing"),
                    React.createElement(card_1.CardDescription, null, "Fill in the details about your hostel. All listings are reviewed by our admin team before being published.")),
                React.createElement(card_1.CardContent, null,
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "name" }, "Hostel Name *"),
                                React.createElement(input_1.Input, { id: "name", placeholder: "e.g., Cozy Campus Hostel", required: true })),
                            React.createElement("div", { className: "grid md:grid-cols-2 gap-4" },
                                React.createElement("div", null,
                                    React.createElement(label_1.Label, { htmlFor: "price" }, "Monthly Price (\u20A6) *"),
                                    React.createElement(input_1.Input, { id: "price", type: "number", placeholder: "5000", required: true })),
                                React.createElement("div", null,
                                    React.createElement(label_1.Label, { htmlFor: "location" }, "Location *"),
                                    React.createElement(input_1.Input, { id: "location", placeholder: "e.g., Campus Area", required: true }))),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "address" }, "Full Address *"),
                                React.createElement(input_1.Input, { id: "address", placeholder: "123 University Road, Campus Area", required: true })),
                            React.createElement("div", null,
                                React.createElement(label_1.Label, { htmlFor: "description" }, "Description *"),
                                React.createElement(textarea_1.Textarea, { id: "description", placeholder: "Describe your hostel, its features, and what makes it special for students...", rows: 5, required: true }))),
                        React.createElement("div", null,
                            React.createElement(label_1.Label, { className: "mb-3 block" }, "Amenities"),
                            React.createElement("div", { className: "grid md:grid-cols-2 gap-3" }, amenitiesList.map(function (amenity) { return (React.createElement("div", { key: amenity, className: "flex items-center space-x-2" },
                                React.createElement(checkbox_1.Checkbox, { id: amenity }),
                                React.createElement("label", { htmlFor: amenity, className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, amenity))); }))),
                        React.createElement("div", null,
                            React.createElement(label_1.Label, { className: "mb-3 block" }, "Photos (1-5 images) *"),
                            React.createElement("div", { className: "border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer" },
                                React.createElement(lucide_react_1.Upload, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }),
                                React.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, "Click to upload or drag and drop"),
                                React.createElement("p", { className: "text-xs text-muted-foreground" }, "JPG, PNG, or WebP (max 5MB each)"),
                                React.createElement("input", { type: "file", accept: "image/jpeg,image/png,image/webp", multiple: true, className: "hidden" }))),
                        React.createElement("div", { className: "flex gap-3 pt-4" },
                            React.createElement(button_1.Button, { type: "button", variant: "outline", className: "flex-1", onClick: function () { return navigate("/landlord-dashboard"); } }, "Cancel"),
                            React.createElement(button_1.Button, { type: "submit", className: "flex-1", disabled: isSubmitting }, isSubmitting ? "Submitting..." : "Submit for Approval"))))))));
};
exports.default = CreateListing;
