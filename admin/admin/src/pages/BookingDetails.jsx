import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBookings } from '../hooks/useBookings'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import Badge from '../components/Badge'

const BookingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { bookings, isLoading } = useBookings()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const found = bookings.find(b => b.id === id || b.id === parseInt(id))
      setBooking(found)
    }
  }, [id, bookings])

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!booking && !isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold dark:text-slate-200">Booking not found</h2>
        <Button onClick={() => navigate('/bookings')} className="mt-4">Back to Bookings</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/bookings')}
          className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
          Booking Details
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Booking Info</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Reference</span>
                <span className="text-base text-slate-900 dark:text-white font-semibold">{booking.reference}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Destination</span>
                <span className="text-base text-slate-900 dark:text-white">{booking.destination}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Departure Date</span>
                <span className="text-base text-slate-900 dark:text-white">{booking.departureDate}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Amount</span>
                <span className="text-base text-slate-900 dark:text-white font-semibold">{booking.amount}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Client & Agency</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Client Name</span>
                <span className="text-base text-slate-900 dark:text-white font-semibold">{booking.client}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Client Email</span>
                <span className="text-base text-slate-900 dark:text-white">{booking.email}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Agency</span>
                <span className="text-base text-slate-900 dark:text-white font-medium">{booking.agency}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">Status</span>
                <div className="mt-1">
                  <Badge>{booking.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
