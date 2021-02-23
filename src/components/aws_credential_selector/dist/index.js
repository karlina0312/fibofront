"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
/* eslint-disable camelcase */
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var api_1 = require("api");
var configs_1 = require("configs");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var modal_form_1 = require("../modal_form");
var credential_1 = require("./credential");
// import Regions from './regions'
var CredentialSelector = function () {
    var intl = react_intl_1.useIntl();
    var form = antd_1.Form.useForm()[0];
    var _isMounted = react_1.useRef(true);
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState([]), awsCredentials = _c[0], setAwsCredentials = _c[1];
    var _d = react_redux_1.useSelector(function (state) { return state.UserReducer; }), aws_region = _d.aws_region, aws_credentials = _d.aws_credentials;
    react_1.useEffect(function () {
        fetchCredential();
        return function () {
            _isMounted.current = false;
        };
    }, []);
    var fetchCredential = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tmpAwsCredentials;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, api_1.listAwsCredential({})];
                case 1:
                    tmpAwsCredentials = (_a.sent());
                    if (_isMounted.current) {
                        setAwsCredentials(tmpAwsCredentials);
                        setLoading(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, api_1.updateAwsCredentialDefault({
                            data: values
                        })];
                case 1:
                    success = _a.sent();
                    setLoading(false);
                    if (success && _isMounted.current) {
                        antd_1.notification.success({
                            message: intl.formatMessage({ id: 'successful' }),
                            description: "project changed."
                        });
                        setTimeout(function () {
                            window.location.reload(false);
                        }, configs_1.CloseAwaitMS);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("strong", { style: { padding: '2px 6px 2px 0' } },
            react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "aws" }),
            ":"),
        react_1["default"].createElement(antd_1.Tag, { color: "red", onClick: function () {
                setVisible(true);
            } }, loading ? (react_1["default"].createElement(icons_1.SyncOutlined, { spin: true })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("strong", null,
                react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "credential" }),
                ":"),
            ' ',
            (aws_credentials === null || aws_credentials === void 0 ? void 0 : aws_credentials.description) || '-'))),
        react_1["default"].createElement(modal_form_1["default"], { visible: visible, loading: loading, title: react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "aws_credential_change" }), formName: "aws_credential_change_from", 
            // okText={<FormattedMessage id="update" />}
            cancelText: react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "cancel" }), onCancel: function () {
                setVisible(false);
            } },
            react_1["default"].createElement(antd_1.Form, { form: form, name: "aws_credential_change_from", layout: "vertical", labelAlign: "left", onFinish: handleFinish, initialValues: { credential_id: aws_credentials === null || aws_credentials === void 0 ? void 0 : aws_credentials.id, region_code: aws_region } },
                react_1["default"].createElement(credential_1["default"], null)))));
};
exports["default"] = CredentialSelector;
