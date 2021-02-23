"use strict";
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var components_1 = require("components");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var styles_module_scss_1 = require("./styles.module.scss");
var CredentailSelector = function () {
    var menu = (react_1["default"].createElement(antd_1.Menu, { selectable: false },
        react_1["default"].createElement(antd_1.Menu.Item, { className: styles_module_scss_1["default"].item },
            react_1["default"].createElement(components_1.AwsCredentailSelector, null))));
    return (react_1["default"].createElement(antd_1.Dropdown, { overlay: menu },
        react_1["default"].createElement(antd_1.Button, { size: "small", type: "primary", icon: react_1["default"].createElement(icons_1.UserSwitchOutlined, null) },
            react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "credential" }),
            " ",
            react_1["default"].createElement(icons_1.DownOutlined, null))));
};
exports["default"] = CredentailSelector;
