import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const AdminLayout = ({ children, darkMode, setDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-slate-950' : 'bg-white'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className={`flex-1 overflow-auto ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout