import { useContext } from 'react'
import { AgencyContext } from '../context/AgencyContext'

export const useAgencies = () => {
  const context = useContext(AgencyContext)
  if (!context) {
    throw new Error('useAgencies must be used within AgencyProvider')
  }
  return context
}