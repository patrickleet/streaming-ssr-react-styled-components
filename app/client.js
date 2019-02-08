import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { rehydrateMarks } from 'react-imported-component'
import importedComponents from './imported' // eslint-disable-line
import App from './App'

export const hydrate = (app, element) => () => {
  ReactDOM.hydrate(app, element)
}

export const start = ({ isProduction, document, module, hydrate }) => {
  const element = document.getElementById('app')
  const app = (
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  )

  // In production, we want to hydrate instead of render
  // because of the server-rendering
  if (isProduction) {
    // rehydrate the bundle marks from imported-components,
    // then rehydrate the react app
    rehydrateMarks().then(hydrate(app, element))
  } else {
    ReactDOM.render(app, element)
  }

  // Enable Hot Module Reloading
  if (module.hot) {
    module.hot.accept()
  }
}

const options = {
  isProduction: process.env.NODE_ENV === 'production',
  document: document,
  module: module,
  hydrate
}

start(options)
