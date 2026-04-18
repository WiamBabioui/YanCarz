import React, { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg border ${bgColors[type]} shadow-lg animate-slide-up z-50`}>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{icons[type]}</span>
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-auto opacity-75 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast