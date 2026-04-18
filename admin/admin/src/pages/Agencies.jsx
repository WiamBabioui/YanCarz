import React, { useState } from 'react'
import { useAgencies } from '../hooks/useAgencies'
import { useCities } from '../hooks/useCities'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2, CheckCircle, Ban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const Agencies = () => {
  const { agencies, isLoading, addAgency, updateAgency, deleteAgency, toggleStatus } = useAgencies()
  const { cities } = useCities()
  const { toast, showToast } = useToast()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedAgency, setSelectedAgency] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    eMail: '',
    nbrPhone: '',
    lastName: '',
    firstMame: '',
    address: '',
    idCity: '',
  })

  // Helper to map idCity to city name
  const getCityName = (idCity) => {
    const city = cities.find(c => c.id === idCity || c.id === Number(idCity))
    return city ? city.name : idCity || 'Unknown'
  }

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch =
      agency.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.eMail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.nbrPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.address?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === 'all' || agency.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const openAddModal = () => {
    setEditingId(null)
    setFormData({ name: '', eMail: '', nbrPhone: '', lastName: '', firstMame: '', address: '', idCity: '' })
    setShowModal(true)
  }

  const openEditModal = (agency) => {
    setEditingId(agency.id)
    setFormData({
      name: agency.name || '',
      eMail: agency.eMail || '',
      nbrPhone: agency.nbrPhone || '',
      lastName: agency.lastName || '',
      firstMame: agency.firstMame || '',
      address: agency.address || '',
      idCity: agency.idCity || '',
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({ name: '', eMail: '', nbrPhone: '', lastName: '', firstMame: '', address: '', idCity: '' })
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
      result = await updateAgency(editingId, formData)
    } else {
      result = await addAgency(formData)
    }

    setModalLoading(false)

    if (result.success) {
      showToast(
        editingId ? 'Agency updated successfully!' : 'Agency added successfully!',
        'success'
      )
      closeModal()
    } else {
      showToast(result.error || 'Something went wrong!', 'error')
    }
  }

  const handleDelete = (agency) => {
    setSelectedAgency(agency)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setModalLoading(true)
    const result = await deleteAgency(selectedAgency.id)
    setModalLoading(false)

    if (result.success) {
      showToast('Agency deleted successfully!', 'success')
      setShowDeleteConfirm(false)
    } else {
      showToast(result.error || 'Failed to delete agency!', 'error')
    }
  }

  const handleToggleStatus = async (agency) => {
    const result = await toggleStatus(agency.id)
    if (result.success) {
      showToast(`Agency ${result.data}!`, 'success')
    } else {
      showToast(result.error || 'Failed to update status!', 'error')
    }
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Agencies Management</h1>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name, email, phone, or address..."
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
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
            Add Agency
          </Button>
        </div>
      </div>

      {/* Table or Empty State */}
      {isLoading && agencies.length === 0 ? (
        <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredAgencies.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <EmptyState
            title="No agencies found"
            description={searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filters.' : 'Get started by adding your first agency.'}

            action={!searchTerm && filterStatus === 'all' ? openAddModal : undefined}
            actionLabel="Add Agency"
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border-b-2 border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Address</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Bookings</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredAgencies.map(agency => (
                  <tr key={agency.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{agency.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{agency.eMail}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{agency.nbrPhone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{agency.address}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{agency.bookings}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{agency.revenue}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge>{agency.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openEditModal(agency)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                          title="Edit"
                          disabled={isLoading}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(agency)}
                          className={`${agency.status === 'active'
                            ? 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300'
                            : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300'} 
                            p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50`}
                          title={agency.status === 'active' ? 'Suspend' : 'Activate'}
                          disabled={isLoading}
                        >
                          {agency.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                        </button>
                        <button
                          onClick={() => navigate(`/agencies/${agency.id}`)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50"
                          title="Details"
                          disabled={isLoading}
                        >
                          🔍
                        </button>
                        <button
                          onClick={() => handleDelete(agency)}
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
        title={editingId ? 'Edit Agency' : 'Add Agency'}
        onClose={closeModal}
        size="lg"
        isLoading={modalLoading}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter agency name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="eMail"
              value={formData.eMail}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Phone Number</label>
            <input
              type="tel"
              name="nbrPhone"
              value={formData.nbrPhone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">First Name</label>
            <input
              type="text"
              name="firstMame"
              value={formData.firstMame}
              onChange={handleInputChange}
              placeholder="Enter first name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">City</label>
            <select
              name="idCity"
              value={formData.idCity}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Select a city</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <Button variant="secondary" onClick={closeModal} disabled={modalLoading} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={modalLoading} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700">
              {editingId ? ' Update' : ' Add'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Agency"
        message={`Are you sure you want to delete ${selectedAgency?.name}? This action cannot be undone.`}
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

export default Agencies