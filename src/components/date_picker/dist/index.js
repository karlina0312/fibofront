"use strict";
exports.__esModule = true;
var dayjs_1 = require("rc-picker/lib/generate/dayjs");
var generatePicker_1 = require("antd/es/date-picker/generatePicker");
require("antd/es/date-picker/style/index");
var DatePicker = generatePicker_1["default"](dayjs_1["default"]);
exports["default"] = DatePicker;
