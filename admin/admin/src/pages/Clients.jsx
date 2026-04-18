import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClient } from '../hooks/useClient'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const Clients = () => {
    const { clients, isLoading, addClient, updateClient, deleteClient } = useClient()
    const { toast, showToast } = useToast()
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [selectedClient, setSelectedClient] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })

    const filteredClients = clients.filter(client => {
        const fullName = `${client.firstName || ''} ${client.lastName || ''}`.toLowerCase()
        const email = (client.email || '').toLowerCase()
        const phone = (client.phone || '').toLowerCase()
        const search = searchTerm.toLowerCase()
        return fullName.includes(search) || email.includes(search) || phone.includes(search)
    })

    const openAddModal = () => {
        setEditingId(null)
        setFormData({ firstName: '', lastName: '', email: '', phone: '' })
        setShowModal(true)
    }

    const openEditModal = (client) => {
        setEditingId(client.id)
        setFormData({
            firstName: client.firstName || '',
            lastName: client.lastName || '',
            email: client.email || '',
            phone: client.phone || '',
        })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setFormData({ firstName: '', lastName: '', email: '', phone: '' })
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
            result = await updateClient(editingId, {
                id: editingId,
                ...formData
            })
        } else {
            result = await addClient(formData)
        }

        setModalLoading(false)

        if (result.success) {
            showToast(
                editingId ? 'Client updated successfully!' : 'Client added successfully!',
                'success'
            )
            closeModal()
        } else {
            showToast(result.error || 'Something went wrong!', 'error')
        }
    }

    const handleDelete = (client) => {
        setSelectedClient(client)
        setShowDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        setModalLoading(true)
        const result = await deleteClient(selectedClient.id)
        setModalLoading(false)

        if (result.success) {
            showToast('Client deleted successfully!', 'success')
            setShowDeleteConfirm(false)
        } else {
            showToast(result.error || 'Failed to delete client!', 'error')
        }
    }

    const handleDetails = (client) => {
        // Option 1: Navigate to details page if it exists
        // navigate(`/clients/${client.id}`)
        // Option 2: For now, show a toast or a modal if details page isn't requested in prompt
        showToast(`Details for ${client.firstName} ${client.lastName}`, 'info')
    }

    return (
        <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Client Management</h1>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 flex w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
                        Add Client
                    </Button>
                </div>
            </div>

            {/* Table or Empty State */}
            {isLoading && clients.length === 0 ? (
                <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredClients.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <EmptyState
                        title="No clients found"
                        description={searchTerm ? 'Try adjusting your search.' : 'Get started by adding your first client.'}
                        action={!searchTerm ? openAddModal : undefined}
                        actionLabel="Add Client"
                    />
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border-b-2 border-slate-200 dark:border-slate-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Client ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">First Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Last Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Phone</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredClients.map(client => (
                                    <tr key={client.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{client.id}</td>
                                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{client.firstName}</td>
                                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{client.lastName}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{client.email}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{client.phone}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(client)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                                                    title="Edit"
                                                    disabled={isLoading}
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDetails(client)}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50"
                                                    title="Details"
                                                    disabled={isLoading}
                                                >
                                                    <Search size={18} />
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
                title={editingId ? 'Edit Client' : 'Add Client'}
                onClose={closeModal}
                size="lg"
                isLoading={modalLoading}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter first name"
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
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter client email"
                            required
                            className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
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
                title="Delete Client"
                message={`Are you sure you want to delete ${selectedClient?.firstName} ${selectedClient?.lastName}? This action cannot be undone.`}
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

export default Clients
