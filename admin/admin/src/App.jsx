import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Agencies from './pages/Agencies'
import Clients from './pages/Clients'
import Countries from './pages/Countries'
import Cities from './pages/Cities'
import Devises from './pages/Devises'
import Bookings from './pages/Bookings'
import Settings from './pages/Settings'
import AdminLayout from './layouts/AdminLayout'
import Marke from './pages/Marke'
import Model from './pages/Model'
import AgencyDetails from './pages/AgencyDetails'
import BookingDetails from './pages/BookingDetails'
import User from './pages/User'
import ZoneGeography from './pages/ZoneGeography'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agencies"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Agencies />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Clients />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/countries"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Countries />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/cities"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Cities />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/devises"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Devises />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Bookings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BookingDetails />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agencies/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AgencyDetails />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/marke"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Marke />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/model"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Model />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <User />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/zone-geography"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ZoneGeography />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

