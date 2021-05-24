import React from "react"
import { Helmet } from 'react-helmet' // Para title
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import reducers from "./reducers"

import App from "./App"
import "./index.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const TITLE = 'Memories'

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <App />
  </Provider>,
  document.getElementById("root"),
)