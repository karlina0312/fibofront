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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
var icons_1 = require("@ant-design/icons");
var pro_layout_1 = require("@ant-design/pro-layout");
var logo_svg_1 = require("assets/logo.svg");
var components_1 = require("components");
var configs_1 = require("configs");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var react_router_dom_1 = require("react-router-dom");
var styles_module_scss_1 = require("./styles.module.scss");
var TopRight_1 = require("./TopRight");
var MainLayout = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var intl = react_intl_1.useIntl();
    var history = react_router_dom_1.useHistory();
    var _b = react_1.useState(false), collapsed = _b[0], setCollapsed = _b[1];
    var settings = react_1.useState(__assign(__assign({}, configs_1["default"]), { fixedHeader: true, fixSiderbar: true }))[0];
    var menuDataRender = function () {
        var menu = [
            {
                key: 'dashboard',
                name: intl.formatMessage({ id: 'menu.dashboard' }),
                path: '/dashboard',
                icon: react_1["default"].createElement(icons_1.AppstoreFilled, { style: { fontSize: 16 } })
            },
        ];
        return menu;
    };
    return (react_1["default"].createElement(pro_layout_1["default"], __assign({ logo: logo_svg_1["default"], siderWidth: 280, disableMobile: false, onMenuHeaderClick: function () { return history.push('/'); }, menuHeaderRender: function (logoDom, titleDom) { return (react_1["default"].createElement(react_router_dom_1.Link, { to: "/", className: "left-logo" },
            logoDom,
            titleDom)); }, collapsed: collapsed, onCollapse: setCollapsed, menuDataRender: menuDataRender, menuItemRender: function (menuItemProps, defaultDom) {
            return menuItemProps.isUrl ? defaultDom : react_1["default"].createElement(react_router_dom_1.Link, { to: menuItemProps.path || '/' }, defaultDom);
        }, rightContentRender: function () { return react_1["default"].createElement(TopRight_1["default"], null); }, footerRender: function () { return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].footer },
            react_1["default"].createElement(components_1.PoweredBy, { color: "black" }))); }, contentStyle: { overflow: 'auto', height: 'calc(100vh - 125px)', padding: 12 } }, props, settings), children));
};
exports["default"] = react_router_dom_1.withRouter(MainLayout);
