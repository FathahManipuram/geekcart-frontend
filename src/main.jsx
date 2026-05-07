import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'
import './styles/global.css';

import { setupInterceptors } from './services/interceptors'
import { GoogleOAuthProvider } from '@react-oauth/google'

setupInterceptors()
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
