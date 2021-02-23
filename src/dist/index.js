"use strict";
exports.__esModule = true;
exports.history = exports.store = void 0;
var connected_react_router_1 = require("connected-react-router");
require("global.less");
var history_1 = require("history");
var localization_1 = require("localization");
var react_1 = require("react");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var reducers_1 = require("redux/reducers");
var sagas_1 = require("redux/sagas");
var router_1 = require("router");
var serviceWorker = require("serviceWorker");
var history = history_1.createBrowserHistory();
exports.history = history;
var sagaMiddleware = redux_saga_1["default"]();
var routeMiddleware = connected_react_router_1.routerMiddleware(history);
var middlewares = [sagaMiddleware, routeMiddleware];
var store = redux_1.createStore(reducers_1["default"](history), redux_1.compose(redux_1.applyMiddleware.apply(void 0, middlewares)));
exports.store = store;
sagaMiddleware.run(sagas_1["default"]);
react_dom_1["default"].render(react_1["default"].createElement(react_redux_1.Provider, { store: store },
    react_1["default"].createElement(localization_1["default"], null,
        react_1["default"].createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend },
            react_1["default"].createElement(router_1["default"], { history: history })))), window.document.getElementById('root'));
serviceWorker.register();
