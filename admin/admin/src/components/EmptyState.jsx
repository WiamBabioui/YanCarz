import React from 'react'
import Button from './Button'

const EmptyState = ({ title, description, icon = '📭', action, actionLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 max-w-sm">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  )
}

export default EmptyState