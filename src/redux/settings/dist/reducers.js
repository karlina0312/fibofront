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
exports.__esModule = true;
exports.Actions = void 0;
var Actions;
(function (Actions) {
    Actions["SET_STATE"] = "settings/SET_STATE";
    Actions["CHANGE_SETTING"] = "settings/CHANGE_SETTING";
})(Actions = exports.Actions || (exports.Actions = {}));
var STORED_SETTINGS = function (storedSettings) {
    var settings = { locale: 'mn-MN' };
    Object.keys(storedSettings).forEach(function (key) {
        var item = localStorage.getItem("app.settings." + key);
        settings[key] = item || storedSettings[key];
    });
    return settings;
};
var initialState = STORED_SETTINGS({
    isMobileView: false,
    isMobileMenuOpen: false,
    isLightTheme: true,
    isSettingsOpen: false,
    isMenuTop: false,
    isMenuCollapsed: false,
    isBorderless: true,
    isSquaredBorders: false,
    isFixedWidth: false,
    isMenuShadow: true,
    locale: 'mn-MN'
});
var SettingsReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Actions.SET_STATE:
            return __assign(__assign({}, state), action.payload);
        case Actions.CHANGE_SETTING:
            return __assign(__assign({}, state), (_a = {}, _a[action.payload.setting] = action.payload.value, _a));
        default:
            return state;
    }
};
exports["default"] = SettingsReducer;
