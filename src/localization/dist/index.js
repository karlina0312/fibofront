"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
// import antdEN from 'antd/lib/locale-provider/en_US'
var mn_MN_1 = require("antd/lib/locale-provider/mn_MN");
var components_1 = require("components");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var dayjs_1 = require("dayjs");
// import english from './locales/en-US'
var mn_MN_2 = require("./locales/mn-MN");
var locales = {
    'mn-MN': mn_MN_2["default"]
};
var antdData = {
    'mn-MN': mn_MN_1["default"]
};
var Localization = function (_a) {
    var children = _a.children;
    var locale = react_redux_1.useSelector(function (state) { return state.SettingsReducer; }).locale;
    dayjs_1["default"].locale(locale.substring(0, 2));
    return (react_1["default"].createElement(antd_1.ConfigProvider, { locale: antdData[locale], renderEmpty: function () { return react_1["default"].createElement(components_1.Empty, null); } },
        react_1["default"].createElement(react_intl_1.IntlProvider, { locale: locale.substring(0, 2), messages: locales[locale] }, children)));
};
exports["default"] = Localization;
