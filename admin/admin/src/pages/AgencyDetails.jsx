import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAgencies } from '../hooks/useAgencies'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Badge from '../components/Badge'

const AgencyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agencies, isLoading } = useAgencies()
  const [agency, setAgency] = useState(null)

  useEffect(() => {
    if (agencies && agencies.length > 0) {
      const found = agencies.find(a => a.id === id || a.id === parseInt(id))
      setAgency(found)
    }
  }, [id, agencies])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!agency && !isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold dark:text-slate-200">Agency not found</h2>
        <Button onClick={() => navigate('/agencies')} className="mt-4">Back to Agencies</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/agencies')}
          className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
          Agency Details
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Information</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Name</span>
                <span className="text-base text-slate-900 dark:text-white font-semibold">{agency.name}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Email</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.eMail}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Phone</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.nbrPhone}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Address</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Manager Details</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">First Name</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.firstMame}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Last Name</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.lastName}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">City ID</span>
                <span className="text-base text-slate-900 dark:text-white">{agency.idCity}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Status</span>
                <div className="mt-1">
                  <Badge>{agency.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Bookings</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{agency.bookings}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <span className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Revenue</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{agency.revenue}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AgencyDetails
