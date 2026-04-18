import React from 'react'
import { useAgencies } from '../hooks/useAgencies'
import { useBookings } from '../hooks/useBookings'
import EmptyState from '../components/EmptyState'

const Dashboard = () => {
  const { agencies, isLoading: agenciesLoading } = useAgencies()
  const { bookings, isLoading: bookingsLoading } = useBookings()
  const isLoading = agenciesLoading || bookingsLoading;

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white min-h-screen p-8">
        <EmptyState
          title="No Bookings Found"
          description="It seems there are no bookings to display at the moment."
          icon="📅"
        />
      </div>
    );
  }

  const activeAgencies = (agencies || []).filter(a => a?.status === 'active').length
  const confirmedBookings = (bookings || []).filter(b => b?.status === 'confirmed').length
  const pendingBookings = (bookings || []).filter(b => b?.status === 'pending').length
  const totalRevenue = (agencies || []).reduce((sum, a) => {
    if (!a?.revenue) return sum;
    const match = a.revenue.match(/(\d+,?\d*)\s*MAD/);
    return sum + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Dashboard</h1>
        <p className="text-gray-600">Welcome back!</p>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Total Agencies - no blue border */}
          <div className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <div className="flex items-start justify-between mb-6">
              {/* Icon with background and shadow */}
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>

              {/* Change percentage */}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-full transition-all duration-300 group-hover:scale-110">
                ↑ +12%
              </span>
            </div>

            {/* Label */}
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Agencies</p>

            <p className="text-3xl font-bold text-gray-900 mb-3">{activeAgencies}</p>

          </div>

          {/* Active Users */}
          <div className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-full transition-all duration-300 group-hover:scale-110">
                ↑ +8%
              </span>
            </div>

            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Active Users</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">{bookings.length.toLocaleString()}</p>

          </div>

          {/* Total Bookings */}
          <div className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.53-1.69 0-.45.54-.45 1.43 0 1.97l3 3.67c.42.54 1.25.54 1.67 0l4.42-5.39c.45-.54.45-1.43 0-1.97-.44-.54-1.25-.54-1.69 0z" />
                </svg>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-full transition-all duration-300 group-hover:scale-110">
                ↑ +23%
              </span>
            </div>

            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">{bookings.length.toLocaleString()}</p>

          </div>

          {/* Total Revenue */}
          <div className="group relative bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1.5 rounded-full transition-all duration-300 group-hover:scale-110">
                ↑ +5%
              </span>
            </div>

            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">{(totalRevenue / 1000).toFixed(1)} MAD</p>

          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <div className="group lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Filter:</label>
                <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:border-gray-400 transition-colors">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>

            {/* Simple Chart Placeholder */}
            <div className="h-64 flex items-end justify-between gap-2 p-4 bg-gray-50 rounded-lg">
              {[65, 85, 45, 75, 95, 60, 80].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-400/50 hover:scale-105 cursor-pointer"
                  style={{ height: `${(height / 100) * 100}%` }}
                  title={`${height}%`}
                >
                  <div className="invisible text-xs text-white text-center mt-1">{height}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Bookings Overview */}
          <div className="group bg-white rounded-lg border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60 cursor-default">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Bookings Overview</h2>

            <div className="space-y-4">
              {/* Confirmed */}
              <div className="flex items-center justify-between hover:bg-indigo-50 p-2 rounded-lg transition-colors cursor-default">
                <div>
                  <p className="text-sm text-indigo-600 font-semibold">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">{confirmedBookings}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 transition-all duration-300 group-hover:shadow-md">
                    <span className="text-indigo-600 text-xs font-semibold">{Math.round((confirmedBookings / bookings.length) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="flex items-center justify-between hover:bg-emerald-50 p-2 rounded-lg transition-colors cursor-default">
                <div>
                  <p className="text-sm text-emerald-600 font-semibold">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingBookings}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 transition-all duration-300 group-hover:shadow-md">
                    <span className="text-emerald-600 text-xs font-semibold">{Math.round((pendingBookings / bookings.length) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Cancelled */}
              <div className="flex items-center justify-between hover:bg-rose-50 p-2 rounded-lg transition-colors cursor-default">
                <div>
                  <p className="text-sm text-rose-600 font-semibold">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length - confirmedBookings - pendingBookings}</p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 transition-all duration-300 group-hover:shadow-md">
                    <span className="text-rose-600 text-xs font-semibold">{Math.round(((bookings.length - confirmedBookings - pendingBookings) / bookings.length) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mt-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-default">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 transition-all duration-300 group-hover:shadow-md">
                      <span className="text-gray-600 text-xs font-semibold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="group mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/60">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.slice(-5).reverse().map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors cursor-default">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.reference}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.agency}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-default ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 hover:shadow-md' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:shadow-md' :
                          'bg-red-100 text-red-700 hover:shadow-md'
                        }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard