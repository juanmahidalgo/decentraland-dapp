import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagasMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { reducer } from './reducer'
import { sagas } from './sagas'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
})

const middlewares = compose(
  applyMiddleware(sagasMiddleware, loggerMiddleware, routerMiddleware(history))
)
const store = createStore(reducer(history), middlewares)

sagasMiddleware.run(sagas)

export { store }
