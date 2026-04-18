import React from 'react'

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    primary: 'bg-blue-600 text-white',
  }

  const getVariant = (value) => {
    if (value === 'active') return 'success'
    if (value === 'suspended') return 'danger'
    if (value === 'confirmed') return 'success'
    if (value === 'pending') return 'warning'
    if (value === 'cancelled') return 'danger'
    return variant
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${variants[getVariant(children)]}`}>
      {children}
    </span>
  )
}

export default Badge