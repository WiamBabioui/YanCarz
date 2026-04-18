import React from 'react'
import Button from './Button'

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isDangerous = false, isLoading = false }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full mx-4">
        {/* Icon */}
        <div className="flex justify-center pt-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDangerous ? 'bg-red-100' : 'bg-blue-100'}`}>
            <svg
              className={`w-6 h-6 ${isDangerous ? 'text-red-600' : 'text-blue-600'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isDangerous ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M6.228 6.228a9 9 0 010 12.728m12.728 0a9 9 0 010-12.728M6.228 6.228L4.464 4.464m15.312 15.312L19.536 19.536" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button variant="secondary" size="md" onClick={onCancel} disabled={isLoading} className="flex-1">
            Cancel
          </Button>
          <Button
            variant={isDangerous ? 'danger' : 'primary'}
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            {isDangerous ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal