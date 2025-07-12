import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Component/Login.jsx'
import App from './App.jsx'
import Register from './Component/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Register/>
  </StrictMode>,
)
