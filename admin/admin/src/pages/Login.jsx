import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button'
import { toast } from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [authError, setAuthError] = useState('')
  
  // Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAuthError('')
    
    const success = await login(email, password, rememberMe)

    if (success) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      setAuthError('Invalid credentials. Please verify your email and password.')
      toast.error('Login failed')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setIsResetting(true)
    // Simulate API call to send reset email
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsResetting(false)
    setIsForgotModalOpen(false)
    toast.success('Password reset link sent to your email.')
    setResetEmail('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 sm:p-10 max-w-md w-full border border-white/50 relative z-10 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-6 shadow-xl shadow-indigo-600/20 transform transition-transform hover:scale-105">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">Sign up for your dashboard account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${authError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm font-medium focus:outline-none focus:ring-4 transition-all duration-200`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${authError ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl text-sm font-medium focus:outline-none focus:ring-4 transition-all duration-200`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer"
                />
              </div>
              <span className="font-medium">Remember me</span>
            </label>

            <button type="button" onClick={() => setIsForgotModalOpen(true)} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Error Message */}
          {authError && (
             <div className="p-3 bg-red-50/80 rounded-lg border border-red-100 flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
               <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <p className="text-xs font-semibold text-red-700 leading-snug">
                 {authError}
               </p>
             </div>
          )}

          {/* Actions */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:shadow-indigo-600/50 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? 'Processing...' : 'Sign Up'}
              </span>
            </Button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in transition-opacity" 
            onClick={() => !isResetting && setIsForgotModalOpen(false)}
          />
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full relative z-10 animate-in zoom-in-95 fade-in duration-200 border border-slate-100">
            
            <button 
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
              disabled={isResetting}
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>

            <div className="mb-6 text-center">
               <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
               </div>
               <h2 className="text-xl font-bold text-slate-900">Forgot Password</h2>
               <p className="text-sm text-slate-500 mt-2 font-medium">Enter your email and we'll send you a reset link.</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <Button
                type="submit"
                isLoading={isResetting}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-md"
              >
                Send Reset Link
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Login