import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import Button from '../components/Button'
import Toast from '../components/Toast'

const Settings = () => {
  const { user } = useAuth()
  const { toast, showToast } = useToast()

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: user?.email || 'admin@example.com',
  })

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    dailyReport: false,
    systemAlerts: true,
  })

  const [appSettings, setAppSettings] = useState({
    platformName: 'Admin Dashboard',
    timezone: 'UTC',
    currency: 'MAD',
    language: 'English',
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAttempts: '5',
  })

  const [theme, setTheme] = useState('light')
  const [isLoading, setIsLoading] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme)
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Profile updated successfully!', 'success')
    setIsLoading(false)
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (passwords.new !== passwords.confirm) {
      showToast('Passwords do not match!', 'error')
      return
    }

    if (passwords.new.length < 8) {
      showToast('Password must be at least 8 characters!', 'error')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Password changed successfully!', 'success')
    setPasswords({ current: '', new: '', confirm: '' })
    setIsLoading(false)
  }

  const handleNotificationChange = (name) => {
    setNotifications(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSaveNotifications = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Notification settings saved!', 'success')
    setIsLoading(false)
  }

  const handleAppSettingChange = (e) => {
    const { name, value } = e.target
    setAppSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveAppSettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Application settings saved!', 'success')
    setIsLoading(false)
  }

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSaveSecuritySettings = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    showToast('Security settings updated!', 'success')
    setIsLoading(false)
  }

  const handleSaveTheme = async (newTheme) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 300))

    // Save to localStorage
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)

    // Apply theme to document
    const htmlElement = document.documentElement
    if (newTheme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }

    showToast(`Theme changed to ${newTheme}!`, 'success')
    setIsLoading(false)
  }

  return (
    <div className="space-y-8 p-8 bg-white dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and application settings</p>
      </div>

      {/* Profile Settings */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg">
            Save Profile
          </Button>
        </form>
      </div>

      {/* Theme Settings */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Theme Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">Choose your preferred theme</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light Mode Button */}
          <button
            onClick={() => handleSaveTheme('light')}
            disabled={isLoading}
            className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 ${theme === 'light'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
              : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
              } disabled:opacity-50 hover:shadow-lg`}
          >
            <span className="text-5xl">☀️</span>
            <div className="text-left">
              <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                Light Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bright interface</p>
            </div>
          </button>

          {/* Dark Mode Button */}
          <button
            onClick={() => handleSaveTheme('dark')}
            disabled={isLoading}
            className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-4 ${theme === 'dark'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
              : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
              } disabled:opacity-50 hover:shadow-lg`}
          >
            <span className="text-5xl">🌙</span>
            <div className="text-left">
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                Dark Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy on eyes</p>
            </div>
          </button>
        </div>
      </div>

      {/* Application Settings */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Application Settings</h2>
        <form onSubmit={handleSaveAppSettings} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Platform Name</label>
              <input
                type="text"
                name="platformName"
                value={appSettings.platformName}
                onChange={handleAppSettingChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Timezone</label>
              <select
                name="timezone"
                value={appSettings.timezone}
                onChange={handleAppSettingChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="CST">CST</option>
                <option value="PST">PST</option>
                <option value="GMT">GMT</option>
                <option value="IST">IST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Currency</label>
              <select
                name="currency"
                value={appSettings.currency}
                onChange={handleAppSettingChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="MAD">MAD (DH)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Language</label>
              <select
                name="language"
                value={appSettings.language}
                onChange={handleAppSettingChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>
          <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg">
            Save Settings
          </Button>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
        <form onSubmit={handleSaveNotifications} className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email for important updates' },
            { key: 'bookingAlerts', label: 'Booking Alerts', description: 'Get notified for new bookings' },
            { key: 'dailyReport', label: 'Daily Report', description: 'Receive daily performance reports' },
            { key: 'systemAlerts', label: 'System Alerts', description: 'Critical system and security alerts' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-600">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-slate-900 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
              </label>
            </div>
          ))}
          <Button type="submit" isLoading={isLoading} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg">
            Save Preferences
          </Button>
        </form>
      </div>

      {/* Security Settings */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
        <form onSubmit={handleSaveSecuritySettings} className="space-y-6">
          {/* Two Factor Auth */}
          <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onChange={handleSecurityChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-slate-900 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
              </label>
            </div>
          </div>

          {/* Session Timeout */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              name="sessionTimeout"
              value={securitySettings.sessionTimeout}
              onChange={handleSecurityChange}
              min="5"
              max="240"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Automatically log out after inactivity</p>
          </div>

          {/* Login Attempts */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Maximum Login Attempts</label>
            <input
              type="number"
              name="loginAttempts"
              value={securitySettings.loginAttempts}
              onChange={handleSecurityChange}
              min="3"
              max="10"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Lock account after failed attempts</p>
          </div>

          <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg">
            Save Security Settings
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 dark:hover:shadow-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
              placeholder="Enter your current password"
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">New Password</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              placeholder="Enter a new password (min. 8 characters)"
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Confirm Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              placeholder="Confirm your new password"
              required
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <p className="text-sm text-indigo-800 dark:text-indigo-300">
              💡 <strong>Password requirements:</strong> Minimum 8 characters, mix of letters and numbers
            </p>
          </div>

          <Button type="submit" isLoading={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg">
            Change Password
          </Button>
        </form>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => { }} />
      )}
    </div>
  )
}

export default Settings