import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const element = document.getElementById('app')
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
)

ReactDOM.render(app, element)

// Enable Hot Module Reloading
if (module.hot) {
  module.hot.accept();
}