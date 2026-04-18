import React, { useState } from 'react'
import { useZoneGeography } from '../hooks/useZoneGeography'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const ZoneGeography = () => {
    const { zoneGeographies, countries, isLoading, addZoneGeography, updateZoneGeography, deleteZoneGeography } = useZoneGeography()
    const { toast, showToast } = useToast()

    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [selectedZone, setSelectedZone] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        countryId: '',
    })

    // PlaceDto returns countryId, not countryName — resolve locally from countries list
    const getCountryName = (countryId) => {
        const country = countries.find(c => c.id === countryId)
        return country ? country.name : 'Unknown'
    }

    const filteredZones = zoneGeographies.filter(zone => {
        return zone.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getCountryName(zone.countryId).toLowerCase().includes(searchTerm.toLowerCase())
    })

    const openAddModal = () => {
        setEditingId(null)
        setFormData({ name: '', countryId: '' })
        setShowModal(true)
    }

    const openEditModal = (zone) => {
        setEditingId(zone.id)
        setFormData({
            name: zone.name || '',
            countryId: zone.countryId || '',
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
            result = await updateZoneGeography(editingId, formData)
        } else {
            result = await addZoneGeography(formData)
        }

        setModalLoading(false)

        if (result.success) {
            showToast(
                editingId ? 'Zone updated successfully!' : 'Zone added successfully!',
                'success'
            )
            closeModal()
        } else {
            showToast(result.error || 'Something went wrong!', 'error')
        }
    }

    const handleDelete = (zone) => {
        setSelectedZone(zone)
        setShowDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        setModalLoading(true)
        const result = await deleteZoneGeography(selectedZone.id)
        setModalLoading(false)

        if (result.success) {
            showToast('Zone deleted successfully!', 'success')
            setShowDeleteConfirm(false)
        } else {
            showToast(result.error || 'Failed to delete zone!', 'error')
        }
    }

    return (
        <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Zone Geography Management</h1>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 flex w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
                        Add Zone
                    </Button>
                </div>
            </div>

            {/* Table or Empty State */}
            {isLoading && zoneGeographies.length === 0 ? (
                <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredZones.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <EmptyState
                        title="No zones found"
                        description={searchTerm ? 'Try adjusting your search.' : 'Get started by adding your first zone.'}
                        action={!searchTerm ? openAddModal : undefined}
                        actionLabel="Add Zone"
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
                                {filteredZones.map(zone => (
                                    <tr key={zone.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{zone.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{zone.countryName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(zone)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                                                    title="Edit"
                                                    disabled={isLoading}
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(zone)}
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
                title={editingId ? 'Edit Zone' : 'Add Zone'}
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
                            placeholder="Enter zone name"
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
                title="Delete Zone"
                message={`Are you sure you want to delete ${selectedZone?.name}? This action cannot be undone.`}
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

export default ZoneGeography
