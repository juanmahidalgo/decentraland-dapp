import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import { App } from './components/App'
import { history, store } from './modules/store'
import { ConnectedRouter } from 'connected-react-router'

import 'decentraland-ui/lib/styles.css'

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ToastProvider position="bottom right">
        <App />
      </ToastProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
