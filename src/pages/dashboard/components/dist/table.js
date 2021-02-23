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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var utils_1 = require("utils");
var TableComponent = function (_a) {
    var loading = _a.loading, group = _a.group, data = _a.data, foundMetric = _a.foundMetric;
    var intl = react_intl_1.useIntl();
    var column = [
        {
            width: 30,
            title: '№',
            dataIndex: 'id'
        },
        {
            width: 300,
            title: intl.formatMessage({ id: 'service' }),
            dataIndex: 'name',
            key: 'name'
        },
    ];
    data.map(function (cost) {
        return column.push({
            width: 80,
            title: cost.TimePeriod.Start.substring(5),
            key: cost.TimePeriod.Start,
            dataIndex: cost.TimePeriod.Start
        });
    });
    var dataSource = function () {
        if (foundMetric) {
            if (group) {
                return Array.from(data.reduce(function (acc, item) {
                    item.Groups.map(function (grp) { return acc.add(grp.Keys[0]); });
                    return acc;
                }, new Set())).reduce(function (acc, item, ind) { return __spreadArrays(acc, [
                    __assign({ id: ind + 1, name: item }, data.reduce(function (datas, res) {
                        var _a;
                        var _b, _c;
                        return __assign(__assign({}, datas), (_a = {}, _a[res.TimePeriod.Start] = utils_1.moneyFormatDollar(parseFloat(((_c = (_b = res.Groups.find(function (r) { return r.Keys.includes(item); })) === null || _b === void 0 ? void 0 : _b.Metrics[foundMetric.key]) === null || _c === void 0 ? void 0 : _c.Amount) || '0')), _a));
                    }, {})),
                ]); }, []);
            }
            return [
                __assign({ id: 1, name: foundMetric === null || foundMetric === void 0 ? void 0 : foundMetric.title }, data.reduce(function (datas, res) {
                    var _a;
                    return __assign(__assign({}, datas), (_a = {}, _a[res.TimePeriod.Start] = utils_1.moneyFormatDollar(parseFloat(res.Total[foundMetric.key] ? res.Total[foundMetric.key].Amount || '0' : '0')), _a));
                }, {})),
            ];
        }
        return [];
    };
    return (react_1["default"].createElement(antd_1.Table, { className: "m_t_2", bordered: true, size: "middle", rowKey: "id", pagination: false, loading: loading, columns: column, scroll: { x: 'max-content' }, dataSource: dataSource() }));
};
exports["default"] = TableComponent;
