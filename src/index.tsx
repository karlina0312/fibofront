import { routerMiddleware } from 'connected-react-router'
import 'global.less'
import { createBrowserHistory } from 'history'
import Localization from 'localization'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from 'redux/reducers'
import sagas from 'redux/sagas'
import Router from 'router'
import * as serviceWorker from 'serviceWorker'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <Localization>
      <DndProvider backend={HTML5Backend}>
        <Router history={history} />
      </DndProvider>
    </Localization>
  </Provider>,
  window.document.getElementById('root')
)

serviceWorker.register()

export { store, history }
