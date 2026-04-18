import React, { useState } from 'react'
import { useCities } from '../hooks/useCities'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const Cities = () => {
  const { cities, countries, isLoading, addCity, updateCity, deleteCity } = useCities()
  const { toast, showToast } = useToast()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCountryId, setFilterCountryId] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    countryId: '',
  })

  // Helper to map countryId to country name or use countryName from API
  const getCountryDisplay = (city) => {
    if (city.countryName) return city.countryName
    const country = countries.find(c => c.id === city.countryId || c.id === Number(city.countryId))
    return country ? country.name : 'Unknown'
  }

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCountryId === 'all' || city.countryId?.toString() === filterCountryId?.toString()

    return matchesSearch && matchesFilter
  })

  const openAddModal = () => {
    setEditingId(null)
    setFormData({ name: '', countryId: '' })
    setShowModal(true)
  }

  const openEditModal = (city) => {
    setEditingId(city.id)
    // Map countryName back to countryId if countryId is missing (CityDto discrepancy)
    let countryId = city.countryId;
    if (!countryId && city.countryName) {
      const country = countries.find(c => c.name === city.countryName);
      if (country) countryId = country.id;
    }
    setFormData({
      name: city.name || '',
      countryId: countryId || '',
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({ name: '', countryId: '' })
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
      result = await updateCity(editingId, formData)
    } else {
      result = await addCity(formData)
    }

    setModalLoading(false)

    if (result.success) {
      showToast(
        editingId ? 'City updated successfully!' : 'City added successfully!',
        'success'
      )
      closeModal()
    } else {
      showToast(result.error || 'Something went wrong!', 'error')
    }
  }

  const handleDelete = (city) => {
    setSelectedCity(city)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    setModalLoading(true)
    const result = await deleteCity(selectedCity.id)
    setModalLoading(false)

    if (result.success) {
      showToast('City deleted successfully!', 'success')
      setShowDeleteConfirm(false)
    } else {
      showToast(result.error || 'Failed to delete city!', 'error')
    }
  }

  return (
    <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Cities Management</h1>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select
              value={filterCountryId}
              onChange={(e) => setFilterCountryId(e.target.value)}
              className="px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Countries</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </div>
          <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
            Add City
          </Button>
        </div>
      </div>

      {/* Table or Empty State */}
      {isLoading && cities.length === 0 ? (
        <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredCities.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <EmptyState
            title="No cities found"
            description={searchTerm || filterCountryId !== 'all' ? 'Try adjusting your search or filters.' : 'Get started by adding your first city.'}
            action={!searchTerm && filterCountryId === 'all' ? openAddModal : undefined}
            actionLabel="Add City"
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border-b-2 border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Country</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCities.map(city => (
                  <tr key={city.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{city.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{getCountryDisplay(city)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openEditModal(city)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                          title="Edit"
                          disabled={isLoading}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(city)}
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
        title={editingId ? 'Edit City' : 'Add City'}
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
              placeholder="Enter city name"
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Country</label>
            <select
              name="countryId"
              value={formData.countryId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Select a country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
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
        title="Delete City"
        message={`Are you sure you want to delete ${selectedCity?.name}? This action cannot be undone.`}
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

export default Cities
