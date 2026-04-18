import React, { useState } from 'react'
import { useBookings } from '../hooks/useBookings'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2, Settings, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const Bookings = () => {
  const { bookings, isLoading, addBooking, updateBooking, deleteBooking, changeStatus } = useBookings()
  const { toast, showToast } = useToast()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  const [formData, setFormData] = useState({
    client: '',
    email: '',
    destination: '',
    departureDate: '',
    agency: '',
    amount: '',
    status: 'pending',
  })

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.agency.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const openAddModal = () => {
    setEditingId(null)
    setFormData({
      client: '',
      email: '',
      destination: '',
      departureDate: '',
      agency: '',
      amount: '',
      status: 'pending',
    })
    setShowModal(true)
  }

  const openEditModal = (booking) => {
    setEditingId(booking.id)
    setFormData({
      client: booking.client,
      email: booking.email,
      destination: booking.destination,
      departureDate: booking.departureDate,
      agency: booking.agency,
      amount: booking.amount,
      status: booking.status,
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({
      client: '',
      email: '',
      destination: '',
      departureDate: '',
      agency: '',
      amount: '',
      status: 'pending',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setModalLoading(true)

    let result
    if (editingId) {
      result = await updateBooking(editingId, formData)
    } else {
      result = await addBooking(formData)
    }

    setModalLoading(false)

    if (result.success) {
      showToast(
        editingId ? 'Booking updated successfully!' : 'Booking added successfully!',
        'success'
      )
      closeModal()
    } else {
      showToast(result.error || 'Something went wrong!', 'error')
    }
  }

  const handleDelete = (booking) => {
    setSelectedBooking(booking)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setModalLoading(true)
    const result = await deleteBooking(selectedBooking.id)
    setModalLoading(false)

    if (result.success) {
      showToast('Booking deleted successfully!', 'success')
      setShowDeleteConfirm(false)
    } else {
      showToast(result.error || 'Failed to delete booking!', 'error')
    }
  }

  const handleStatusChange = async (booking, newStatus) => {
    const result = await changeStatus(booking.id, newStatus)
    if (result.success) {
      showToast(`Booking status changed to ${newStatus}!`, 'success')
    } else {
      showToast(result.error || 'Failed to update status!', 'error')
    }
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Bookings</h1>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by reference, client, or agency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
            New Booking
          </Button>
        </div>
      </div>

      {/* Table or Empty State */}
      {isLoading && bookings.length === 0 ? (
        <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <EmptyState
            title="No bookings found"
            description={searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filters.' : 'Get started by adding your first booking.'}
            action={!searchTerm && filterStatus === 'all' ? openAddModal : undefined}
            actionLabel="New Booking"
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border-b-2 border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Agency</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Destination</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{booking.reference}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{booking.client}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{booking.agency}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{booking.destination}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{booking.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge>{booking.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openEditModal(booking)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                          title="Edit"
                          disabled={isLoading}
                        >
                          <Pencil size={18} />
                        </button>
                        <div className="relative group">
                          <button
                            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors disabled:opacity-50"
                            title="Change Status"
                            disabled={isLoading}
                          >
                            <Settings size={18} />
                          </button>
                          <div className="hidden group-hover:block absolute right-0 mt-1 w-44 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10 transition-all duration-200 origin-top-right">
                            {['pending', 'confirmed', 'cancelled'].map(status => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(booking, status)}
                                className="block w-full text-left px-4 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg font-semibold text-slate-900 dark:text-white disabled:opacity-50 transition-colors"
                                disabled={isLoading}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50"
                          title="Details"
                          disabled={isLoading}
                        >
                          🔍
                        </button>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                          title="Delete"
                          disabled={isLoading}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Booking' : 'New Booking'}
        onClose={closeModal}
        size="lg"
        isLoading={modalLoading}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Client Name</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Enter client name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Agency</label>
            <input
              type="text"
              name="agency"
              value={formData.agency}
              onChange={handleInputChange}
              placeholder="Enter agency name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Departure Date</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="e.g., 450 MAD"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="secondary" onClick={closeModal} disabled={modalLoading} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={modalLoading} className="flex-1 bg-gradient-to-r from-red-600 to-red-700">
              {editingId ? '✏️ Update' : '➕ Create'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Booking"
        message={`Are you sure you want to delete booking ${selectedBooking?.reference}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isDangerous={true}
        isLoading={modalLoading}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => { }} />}
    </div>
  )
}

export default Bookings