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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.LOGOUT = exports.GET_AUTH_USER = exports.LOGIN = void 0;
var effects_1 = require("redux-saga/effects");
var reducers_1 = require("./reducers");
var services_1 = require("./services");
function LOGIN(_a) {
    var success;
    var _b = _a.payload, email = _b.email, password = _b.password;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, effects_1.put({ type: reducers_1.Actions.SET_STATE, payload: { loading: true } })];
            case 1:
                _c.sent();
                return [4 /*yield*/, effects_1.call(services_1.login, email, password)];
            case 2:
                success = _c.sent();
                if (!success) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put({ type: reducers_1.Actions.GET_AUTH_USER })];
            case 3:
                _c.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put({
                    type: reducers_1.Actions.SET_STATE,
                    payload: { authorized: false, loading: false }
                })];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
exports.LOGIN = LOGIN;
function GET_AUTH_USER() {
    var user, ipAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.put({ type: reducers_1.Actions.SET_STATE, payload: { loading: true } })];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.call(services_1.getAuthUser)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, effects_1.call(services_1.getPublicIP)];
            case 3:
                ipAddress = _a.sent();
                if (!user) return [3 /*break*/, 5];
                user.authorized = true;
                user.loading = false;
                return [4 /*yield*/, effects_1.put({
                        type: reducers_1.Actions.SET_STATE,
                        payload: __assign(__assign({}, user), { ipAddress: ipAddress })
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put({
                    type: reducers_1.Actions.SET_STATE,
                    payload: { authorized: false, loading: false, ipAddress: ipAddress }
                })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
exports.GET_AUTH_USER = GET_AUTH_USER;
function LOGOUT() {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.call(services_1.logout)];
            case 1:
                _a.sent();
                user = { authorized: false, loading: false };
                return [4 /*yield*/, effects_1.put({
                        type: reducers_1.Actions.SET_STATE,
                        payload: user
                    })];
            case 2:
                _a.sent();
                localStorage.removeItem('token');
                window.location.href = '/';
                return [2 /*return*/];
        }
    });
}
exports.LOGOUT = LOGOUT;
function rootSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.all([
                    effects_1.takeLatest(reducers_1.Actions.LOGIN, LOGIN),
                    effects_1.takeLatest(reducers_1.Actions.GET_AUTH_USER, GET_AUTH_USER),
                    effects_1.takeLatest(reducers_1.Actions.LOGOUT, LOGOUT),
                    GET_AUTH_USER(),
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports["default"] = rootSaga;
