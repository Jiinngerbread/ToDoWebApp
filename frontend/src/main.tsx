import ReactDom from 'react-dom/client'
import App from './App'
import React from 'react'

const rootEl = document.getElementById("root") as HTMLElement
const root = ReactDom.createRoot(rootEl)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)