"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var mn_svg_1 = require("assets/flags/mn.svg");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var reducers_1 = require("redux/settings/reducers");
var size = 24;
var LanguageSelector = function () {
    var dispatch = react_redux_1.useDispatch();
    var locale = react_redux_1.useSelector(function (state) { return state.SettingsReducer; }).locale;
    var changeLang = function (loc) {
        dispatch({
            type: reducers_1.Actions.CHANGE_SETTING,
            payload: {
                setting: 'locale',
                value: loc
            }
        });
    };
    return locale === 'mn-MN' ? (react_1["default"].createElement(antd_1.Button, { type: "link", onClick: function () {
            changeLang('mn-MN');
        } },
        react_1["default"].createElement(mn_svg_1.ReactComponent, { width: size, height: size }))) : (react_1["default"].createElement(antd_1.Button, { type: "link", onClick: function () {
            changeLang('mn-MN');
        } },
        react_1["default"].createElement(mn_svg_1.ReactComponent, { width: size, height: size })));
};
exports["default"] = LanguageSelector;
