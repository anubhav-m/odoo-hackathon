import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Component/Login.jsx'
import App from './App.jsx'
import Register from './Component/Register.jsx'
import Askquestion from './Component/Askquestion.jsx'
import Screen3 from './Component/screen3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Askquestion/>
  </StrictMode>,
)
