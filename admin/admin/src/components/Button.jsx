import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex justify-center items-center gap-2 font-semibold rounded-lg transition-all duration-200'

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105 disabled:opacity-50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50',
    ghost: 'text-gray-700 hover:bg-gray-100 disabled:opacity-50',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button