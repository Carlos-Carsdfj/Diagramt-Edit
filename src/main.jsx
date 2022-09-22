import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CreatreGoJsContext } from './context/gojsContext'
import { UserProvider } from './context/userContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreatreGoJsContext>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </CreatreGoJsContext>
  </React.StrictMode>
)
