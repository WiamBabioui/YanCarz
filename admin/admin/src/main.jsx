import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { AuthProvider, AgencyProvider, BookingProvider } from './context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AgencyProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </AgencyProvider>
    </AuthProvider>
  </React.StrictMode>,
)