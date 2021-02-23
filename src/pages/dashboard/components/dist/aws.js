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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var api_1 = require("api");
var current_svg_1 = require("assets/icons/current.svg");
var forecast_svg_1 = require("assets/icons/forecast.svg");
var components_1 = require("components");
var dayjs_1 = require("dayjs");
var react_1 = require("react");
var react_chartjs_2_1 = require("react-chartjs-2");
var bar_1 = require("@nivo/bar");
var react_intl_1 = require("react-intl");
var utils_1 = require("utils");
var table_1 = require("./table");
var statics_1 = require("./statics");
var styles_module_scss_1 = require("./styles.module.scss");
var today = dayjs_1["default"]();
var startOfMonth = dayjs_1["default"]().startOf('month');
var endOfMonth = dayjs_1["default"]().endOf('month');
var data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
];
var FormElement = function (_a) {
    var title = _a.title, children = _a.children;
    return (react_1["default"].createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: 12
        } },
        react_1["default"].createElement("strong", null,
            title,
            ":"),
        children));
};
var AwsBilling = function () {
    var _a, _b, _c;
    var _isMounted = react_1.useRef(true);
    var _d = react_1.useState(true), curLoading = _d[0], setCurLoading = _d[1];
    var _f = react_1.useState(true), costloading = _f[0], setCostLoading = _f[1];
    var _g = react_1.useState([startOfMonth, today]), rangeDate = _g[0], setRangeDate = _g[1];
    var _h = react_1.useState('DAILY'), granularity = _h[0], setGranularity = _h[1];
    var _j = react_1.useState('UNBLENDED_COST'), metric = _j[0], setMetric = _j[1];
    var _k = react_1.useState(), group = _k[0], setGroup = _k[1];
    var _l = react_1.useState([]), services = _l[0], setServices = _l[1];
    var _m = react_1.useState([]), costResult = _m[0], setCostResult = _m[1];
    var _o = react_1.useState(), totalCost = _o[0], setTotalCost = _o[1];
    var _p = react_1.useState(), forecastResult = _p[0], setForecastResult = _p[1];
    var foundMetric = statics_1.metricsValues.find(function (met) { return met.value === metric; });
    var loading = curLoading || costloading;
    react_1.useEffect(function () {
        fetchCurrent();
        return function () {
            _isMounted.current = false;
        };
    }, []);
    react_1.useEffect(function () {
        if (foundMetric) {
            fetchCustomCost(rangeDate[0], rangeDate[1], granularity, foundMetric, services, group || '');
        }
    }, [rangeDate, granularity, foundMetric, services, group]);
    var fetchCurrent = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cr, fr, tmp, tmp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setCurLoading(true);
                    return [4 /*yield*/, Promise.all([
                            api_1.getCostAwsBilling({
                                data: {
                                    start_date: utils_1.DayJsFormatOnlyDate(startOfMonth),
                                    end_date: utils_1.DayJsFormatOnlyDate(today),
                                    granularity: 'MONTHLY',
                                    metric: ['UNBLENDED_COST'],
                                    services: [],
                                    group_name: ''
                                }
                            }),
                            api_1.forecastAwsBilling({
                                data: {
                                    start_date: utils_1.DayJsFormatOnlyDate(today),
                                    end_date: utils_1.DayJsFormatOnlyDate(endOfMonth.add(1, 'day')),
                                    granularity: 'DAILY',
                                    metric: 'UNBLENDED_COST'
                                }
                            }),
                        ])];
                case 1:
                    _a = _b.sent(), cr = _a[0], fr = _a[1];
                    if (_isMounted.current) {
                        if (fr) {
                            tmp = fr;
                            setForecastResult(tmp);
                        }
                        if (cr && cr.ResultsByTime && cr.ResultsByTime.length > 0) {
                            tmp = cr.ResultsByTime[0];
                            setTotalCost(tmp);
                        }
                        setCurLoading(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchCustomCost = function (sd, ed, gr, mt, sr, gn) { return __awaiter(void 0, void 0, void 0, function () {
        var cabs, tmp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCostLoading(true);
                    return [4 /*yield*/, api_1.getCostAwsBilling({
                            data: {
                                start_date: utils_1.DayJsFormatOnlyDate(sd),
                                end_date: utils_1.DayJsFormatOnlyDate(ed),
                                granularity: gr,
                                metric: [mt.value],
                                services: sr,
                                group_name: gn
                            }
                        })];
                case 1:
                    cabs = _a.sent();
                    if (_isMounted.current) {
                        if (cabs && cabs.ResultsByTime && cabs.ResultsByTime.length > 0) {
                            tmp = cabs.ResultsByTime;
                            setCostResult(tmp.reduce(function (acc, item) {
                                item.Groups = item.Groups.filter(function (val) {
                                    var _a;
                                    return parseFloat(((_a = val.Metrics[mt.key]) === null || _a === void 0 ? void 0 : _a.Amount) || '0') > 0;
                                });
                                acc.push(item);
                                return acc;
                            }, []));
                        }
                        setCostLoading(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var tmpLastDay = endOfMonth.add(-1, 'day');
    if (foundMetric &&
        services.length === 0 &&
        forecastResult &&
        forecastResult.ForecastResultsByTime &&
        forecastResult.ForecastResultsByTime.length > 0 &&
        rangeDate[0].isBefore(tmpLastDay) &&
        rangeDate[1].isAfter(tmpLastDay)) {
        forecastResult.ForecastResultsByTime.map(function (item) {
            return costResult.findIndex(function (t) {
                if (t.TimePeriod.Start === item.TimePeriod.Start) {
                    t.Total[foundMetric.key].Amount = item.MeanValue;
                    t.IsForecast = true;
                    return true;
                }
                return false;
            });
        });
    }
    var chartLabel = costResult.reduce(function (acc, item) { return __spreadArrays(acc, [utils_1.DayJSFormatAWS(dayjs_1["default"](item.TimePeriod.Start))]); }, []);
    var stacked = !!group;
    var chartData = function () {
        if (foundMetric) {
            if (group) {
                return Array.from(costResult.reduce(function (acc, item) {
                    item.Groups.map(function (grp) {
                        var _a, _b;
                        return acc.set(grp.Keys[0], (acc.get(grp.Keys[0]) || 0) +
                            utils_1.moneyFormat(parseFloat(((_b = (_a = item.Groups.find(function (r) { return r.Keys.includes(grp.Keys[0]); })) === null || _a === void 0 ? void 0 : _a.Metrics[foundMetric.key]) === null || _b === void 0 ? void 0 : _b.Amount) || '0')));
                    });
                    return acc;
                }, new Map()))
                    .sort(function (a, b) { return b[1] - a[1]; })
                    .slice(0, 6)
                    .reduce(function (acc, item, index, arr) {
                    var isOther = index === 5;
                    return __spreadArrays(acc, [
                        {
                            label: isOther ? 'Others' : item[0],
                            stack: 'stack',
                            backgroundColor: statics_1.colors[index],
                            borderColor: statics_1.colors[index],
                            borderWidth: 0.5,
                            barPercentage: 0.6,
                            hoverBackgroundColor: statics_1.colors[index],
                            hoverBorderColor: statics_1.colors[index],
                            data: isOther
                                ? costResult.reduce(function (datas, res) { return __spreadArrays(datas, [
                                    res.Groups.reduce(function (gdatas, gres) {
                                        var _a;
                                        gdatas += utils_1.moneyFormat(parseFloat((arr.findIndex(function (ari) { return ari[0] === gres.Keys[0]; }) < 0 && ((_a = gres.Metrics[foundMetric.key]) === null || _a === void 0 ? void 0 : _a.Amount)) ||
                                            '0'));
                                        return gdatas;
                                    }, 0),
                                ]); }, [])
                                : costResult.reduce(function (datas, res) {
                                    var _a, _b;
                                    return __spreadArrays(datas, [
                                        utils_1.moneyFormat(parseFloat(((_b = (_a = res.Groups.find(function (r) { return r.Keys.includes(item[0]); })) === null || _a === void 0 ? void 0 : _a.Metrics[foundMetric.key]) === null || _b === void 0 ? void 0 : _b.Amount) || '0')),
                                    ]);
                                }, [])
                        },
                    ]);
                }, []);
            }
            return [
                {
                    label: foundMetric.title,
                    backgroundColor: costResult.reduce(function (datas, res) { return __spreadArrays(datas, [res.IsForecast ? '#fff' : statics_1.colors[0]]); }, []),
                    borderColor: statics_1.colors[0],
                    borderWidth: 0.5,
                    barPercentage: 0.6,
                    hoverBackgroundColor: costResult.reduce(function (datas, res) { return __spreadArrays(datas, [res.IsForecast ? '#fff' : statics_1.colors[0]]); }, []),
                    hoverBorderColor: statics_1.colors[0],
                    data: costResult.reduce(function (datas, res) { return __spreadArrays(datas, [
                        utils_1.moneyFormat(parseFloat(res.Total[foundMetric.key] ? res.Total[foundMetric.key].Amount || '0' : '0')),
                    ]); }, [])
                },
            ];
        }
        return undefined;
    };
    return (react_1["default"].createElement(components_1.PageLayout, { loading: loading, fetchAction: function (_e) {
            if (foundMetric) {
                fetchCustomCost(rangeDate[0], rangeDate[1], granularity, foundMetric, services, group || '');
            }
        }, title: react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "menu.billing" }) },
        react_1["default"].createElement(antd_1.Spin, { spinning: loading },
            react_1["default"].createElement(antd_1.Row, { gutter: 24 },
                react_1["default"].createElement(antd_1.Col, { xs: 24, sm: 24, md: 12, xl: 8, xxl: 6 },
                    react_1["default"].createElement(components_1.Card, { bodyStyle: { padding: 5 }, style: { backgroundColor: '#4b5d67', color: '#fff' } },
                        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].totalCard },
                            react_1["default"].createElement("span", { className: styles_module_scss_1["default"].titleContainer },
                                react_1["default"].createElement(icons_1["default"], { component: current_svg_1.ReactComponent, style: { fontSize: 36, marginRight: 8 } }),
                                react_1["default"].createElement("span", { className: styles_module_scss_1["default"].title },
                                    react_1["default"].createElement("span", { className: styles_module_scss_1["default"].label },
                                        react_1["default"].createElement(react_intl_1.FormattedMessage, { id: "billing.current_cost" })),
                                    react_1["default"].createElement("span", { className: styles_module_scss_1["default"].subTitle },
                                        "(",
                                        utils_1.DayJSFormatAWS(startOfMonth),
                                        " - ",
                                        utils_1.DayJSFormatAWS(today),
                                        ")"))),
                            react_1["default"].createElement("span", { className: styles_module_scss_1["default"].amount }, utils_1.moneyFormatDollar(parseFloat(((_a = totalCost === null || totalCost === void 0 ? void 0 : totalCost.Total['UnblendedCost']) === null || _a === void 0 ? void 0 : _a.Amount) || '0')))))),
                react_1["default"].createElement(antd_1.Col, { xs: 24, sm: 24, md: 12, xl: 8, xxl: 6 },
                    react_1["default"].createElement(components_1.Card, { bodyStyle: { padding: 5 } },
                        react_1["default"].createElement("div", { className: styles_module_scss_1["default"].totalCard },
                            react_1["default"].createElement("span", { className: styles_module_scss_1["default"].titleContainer },
                                react_1["default"].createElement(icons_1["default"], { component: forecast_svg_1.ReactComponent, style: { fontSize: 36, marginRight: 8 } }),
                                react_1["default"].createElement("span", { className: styles_module_scss_1["default"].title },
                                    react_1["default"].createElement("span", { className: styles_module_scss_1["default"].label }, "\u0422\u04AF\u04AF\u0445"),
                                    react_1["default"].createElement("span", { className: styles_module_scss_1["default"].subTitle },
                                        "(",
                                        utils_1.DayJSFormatAWS(startOfMonth),
                                        " - ",
                                        utils_1.DayJSFormatAWS(endOfMonth),
                                        ")"))),
                            react_1["default"].createElement("span", { className: styles_module_scss_1["default"].amount }, utils_1.moneyFormatDollar(parseFloat(((_b = totalCost === null || totalCost === void 0 ? void 0 : totalCost.Total['UnblendedCost']) === null || _b === void 0 ? void 0 : _b.Amount) || '0') +
                                parseFloat(((_c = forecastResult === null || forecastResult === void 0 ? void 0 : forecastResult.Total) === null || _c === void 0 ? void 0 : _c.Amount) || '0'))))))),
            react_1["default"].createElement(antd_1.Row, { gutter: 12 },
                react_1["default"].createElement(antd_1.Col, { xl: 20, md: 16, xs: 24 },
                    react_1["default"].createElement("div", { style: { height: '400px' } },
                        react_1["default"].createElement(bar_1.ResponsiveBar, { data: data, keys: ['earnings'], indexBy: "quarter" })),
                    react_1["default"].createElement(react_chartjs_2_1.Bar, { data: {
                            labels: chartLabel,
                            datasets: chartData()
                        }, options: {
                            scales: {
                                yAxes: [
                                    {
                                        stacked: stacked,
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Cost ($)'
                                        }
                                    },
                                ]
                            }
                        } })),
                react_1["default"].createElement(antd_1.Col, { xl: 4, md: 8, xs: 24, style: { marginTop: 10 } })),
            react_1["default"].createElement(table_1["default"], { loading: loading, group: group, data: costResult, foundMetric: foundMetric }))));
};
exports["default"] = AwsBilling;
