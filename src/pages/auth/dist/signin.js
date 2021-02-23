"use strict";
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var components_1 = require("components");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var react_redux_1 = require("react-redux");
var reducers_1 = require("redux/user/reducers");
var styles_module_scss_1 = require("./styles.module.scss");
var Signin = function () {
    var intl = react_intl_1.useIntl();
    var loading = react_redux_1.useSelector(function (state) { return state.UserReducer; }).loading;
    var form = antd_1.Form.useForm()[0];
    var dispatch = react_redux_1.useDispatch();
    var handleFinish = function (values) {
        dispatch({
            type: reducers_1.Actions.LOGIN,
            payload: values
        });
    };
    return (react_1["default"].createElement(antd_1.Card, { bordered: false },
        react_1["default"].createElement(antd_1.Form, { form: form, name: "login_form", labelAlign: "left", layout: "vertical", className: styles_module_scss_1["default"].form, onFinish: handleFinish, hideRequiredMark: true },
            react_1["default"].createElement(components_1.FormInput, { required: true, name: "email", type: "input", className: styles_module_scss_1["default"].input, prefix: react_1["default"].createElement(icons_1.UserOutlined, null), label: intl.formatMessage({ id: 'email' }), placeholder: intl.formatMessage({ id: 'email' }) }),
            react_1["default"].createElement(components_1.FormInput, { required: true, name: "password", type: "password", className: styles_module_scss_1["default"].input, prefix: react_1["default"].createElement(icons_1.LockOutlined, null), label: intl.formatMessage({ id: 'password' }), placeholder: intl.formatMessage({ id: 'password' }) }),
            react_1["default"].createElement(antd_1.Form.Item, { className: styles_module_scss_1["default"].buttonContainer },
                react_1["default"].createElement(antd_1.Button, { block: true, className: styles_module_scss_1["default"].button, type: "primary", htmlType: "submit", loading: loading },
                    react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "signin" }))))));
};
exports["default"] = Signin;
