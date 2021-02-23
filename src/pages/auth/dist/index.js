"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var components_1 = require("components");
var react_1 = require("react");
var configs_1 = require("configs");
var logo_svg_1 = require("assets/logo.svg");
var react_intl_1 = require("react-intl");
var signin_1 = require("./signin");
var signup_1 = require("./signup");
var styles_module_scss_1 = require("./styles.module.scss");
var TabPane = antd_1.Tabs.TabPane;
var Auth = function () {
    var intl = react_intl_1.useIntl();
    return (react_1["default"].createElement(components_1.Card, { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].header },
            react_1["default"].createElement(logo_svg_1.ReactComponent, { width: "40px", height: "40px" }),
            react_1["default"].createElement("h1", { className: styles_module_scss_1["default"].title }, configs_1["default"].title)),
        react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1", centered: true },
            react_1["default"].createElement(TabPane, { tab: intl.formatMessage({ id: 'signin' }), key: "1" },
                react_1["default"].createElement(signin_1["default"], null)),
            react_1["default"].createElement(TabPane, { tab: intl.formatMessage({ id: 'signup' }), key: "2" },
                react_1["default"].createElement(signup_1["default"], null)))));
};
exports["default"] = Auth;
