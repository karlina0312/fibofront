"use strict";
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var classnames_1 = require("classnames");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var reducers_1 = require("redux/user/reducers");
var styles_module_scss_1 = require("./styles.module.scss");
var ProfileMenu = function () {
    var dispatch = react_redux_1.useDispatch();
    var email = react_redux_1.useSelector(function (state) { return state.UserReducer; }).email;
    var logout = function () {
        dispatch({
            type: reducers_1.Actions.LOGOUT
        });
    };
    var avatar = email || 'AU';
    var menu = (react_1["default"].createElement(antd_1.Menu, { selectable: false },
        react_1["default"].createElement(antd_1.Menu.Item, { className: styles_module_scss_1["default"].item },
            react_1["default"].createElement("div", { className: styles_module_scss_1["default"].profile },
                react_1["default"].createElement(antd_1.Avatar, { shape: "square", className: classnames_1["default"]('noselect', styles_module_scss_1["default"].avatar), size: 40 }, avatar.toUpperCase()),
                react_1["default"].createElement("div", { className: styles_module_scss_1["default"].names }, email + " ",
                    " ",
                    react_1["default"].createElement("br", null)))),
        react_1["default"].createElement(antd_1.Menu.Divider, null),
        react_1["default"].createElement(antd_1.Menu.Item, { onClick: logout, className: styles_module_scss_1["default"].item },
            react_1["default"].createElement(icons_1.LockOutlined, null),
            " ",
            react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "password_change" })),
        react_1["default"].createElement(antd_1.Menu.Divider, null),
        react_1["default"].createElement(antd_1.Menu.Item, { onClick: logout, className: styles_module_scss_1["default"].item },
            react_1["default"].createElement(icons_1.LockOutlined, null),
            " ",
            react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "signout" }))));
    return (react_1["default"].createElement(antd_1.Dropdown, { overlay: menu, trigger: ['click'] },
        react_1["default"].createElement("div", { className: classnames_1["default"](styles_module_scss_1["default"].profile, 'm_l_1') },
            react_1["default"].createElement(antd_1.Avatar, { shape: "square", className: classnames_1["default"]('noselect', styles_module_scss_1["default"].avatar), size: 40 }, avatar.toUpperCase()))));
};
exports["default"] = ProfileMenu;
