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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var hooks_1 = require("hooks");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var ModalComponent = function (_a) {
    var title = _a.title, okText = _a.okText, okIcon = _a.okIcon, children = _a.children, cancelIcon = _a.cancelIcon, cancelText = _a.cancelText, loading = _a.loading, onCancel = _a.onCancel, formName = _a.formName, _b = _a.okDisable, okDisable = _b === void 0 ? false : _b, props = __rest(_a, ["title", "okText", "okIcon", "children", "cancelIcon", "cancelText", "loading", "onCancel", "formName", "okDisable"]);
    var intl = react_intl_1.useIntl();
    var width = hooks_1.useWindow()[0];
    var calcWidth = function () {
        if (width >= 1200) {
            return '30%';
        }
        if (width >= 768) {
            return '50%';
        }
        return '100%';
    };
    return (react_1["default"].createElement(antd_1.Drawer, __assign({ maskClosable: true, width: calcWidth(), title: react_1["default"].createElement("strong", null, title), placement: "right", onClose: function () {
            onCancel();
        }, footer: react_1["default"].createElement(antd_1.Row, { gutter: 12 },
            react_1["default"].createElement(antd_1.Col, { span: 12 },
                react_1["default"].createElement(antd_1.Button, { block: true, key: "cancel", type: "default", icon: cancelIcon || react_1["default"].createElement(icons_1.CloseCircleOutlined, null), onClick: function () {
                        onCancel();
                    } },
                    react_1["default"].createElement(react_1["default"].Fragment, null, cancelText || intl.formatMessage({ id: 'cancel' }))))) }, props), children));
};
exports["default"] = ModalComponent;
