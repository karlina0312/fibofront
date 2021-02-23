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
    Actions["SET_STATE"] = "user/SET_STATE";
    Actions["LOGIN"] = "user/LOGIN";
    Actions["REGISTER"] = "user/REGISTER";
    Actions["LOGOUT"] = "user/LOGOUT";
    Actions["PASSWORD"] = "user/PASSWORD_CHANGE";
    Actions["GET_AUTH_USER"] = "user/GET_AUTH_USER";
})(Actions = exports.Actions || (exports.Actions = {}));
var initialState = {
    loading: false,
    authorized: false,
    ipAddress: ''
};
var UserReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Actions.SET_STATE:
            return __assign(__assign({}, state), action.payload);
        default:
            return state;
    }
};
exports["default"] = UserReducer;
