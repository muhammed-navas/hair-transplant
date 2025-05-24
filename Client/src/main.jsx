import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Apiprovider } from './componets/Contextapi/Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Apiprovider>

    <App />
    
    </Apiprovider>
  </BrowserRouter>
  </React.StrictMode>
)
