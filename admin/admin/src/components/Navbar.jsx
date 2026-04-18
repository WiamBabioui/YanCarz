import React from 'react'

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-300 font-bold text-xl"
          >
            ☰
          </button>
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search agencies..."
              className="w-80 px-4 py-2.5 bg-slate-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700 placeholder:text-gray-500"
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Email */}
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              AD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-100">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar