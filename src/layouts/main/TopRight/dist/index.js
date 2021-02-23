"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var components_1 = require("components");
// import CredentialList from './../../../pages/credential'
var react_1 = require("react");
var styles_module_scss_1 = require("./styles.module.scss");
var TopRight = function () {
    return (react_1["default"].createElement("div", { className: styles_module_scss_1["default"].container },
        react_1["default"].createElement(components_1.CredentialSelector, null),
        react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
        react_1["default"].createElement(components_1.LanguageSelector, null),
        react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
        react_1["default"].createElement(components_1.ProfileMenu, null)));
};
exports["default"] = TopRight;
