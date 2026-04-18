import React, { useState } from 'react'
import { useUser } from '../hooks/useUser'
import { useToast } from '../hooks/useToast'
import { Pencil, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'
import Button from '../components/Button'
import Toast from '../components/Toast'
import EmptyState from '../components/EmptyState'

const User = () => {
    const { users, isLoading, addUser, updateUser, deleteUser } = useUser()
    const { toast, showToast } = useToast()

    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const filteredUsers = users.filter(user => {
        return user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const openAddModal = () => {
        setEditingId(null)
        setFormData({ name: '', email: '', password: '' })
        setShowModal(true)
    }

    const openEditModal = (user) => {
        setEditingId(user.id)
        setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '',
        })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setFormData({ name: '', email: '', password: '' })
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
            // UserDto expects id, name, email for PUT
            result = await updateUser(editingId, {
                id: editingId,
                name: formData.name,
                email: formData.email
            })
        } else {
            result = await addUser(formData)
        }

        setModalLoading(false)

        if (result.success) {
            showToast(
                editingId ? 'User updated successfully!' : 'User added successfully!',
                'success'
            )
            closeModal()
        } else {
            showToast(result.error || 'Something went wrong!', 'error')
        }
    }

    const handleDelete = (user) => {
        setSelectedUser(user)
        setShowDeleteConfirm(true)
    }

    const confirmDelete = async () => {
        setModalLoading(true)
        const result = await deleteUser(selectedUser.id)
        setModalLoading(false)

        if (result.success) {
            showToast('User deleted successfully!', 'success')
            setShowDeleteConfirm(false)
        } else {
            showToast(result.error || 'Failed to delete user!', 'error')
        }
    }

    return (
        <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">User Management</h1>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 flex w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <Button onClick={openAddModal} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg">
                        Add User
                    </Button>
                </div>
            </div>

            {/* Table or Empty State */}
            {isLoading && users.length === 0 ? (
                <div className="flex justify-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                    <EmptyState
                        title="No users found"
                        description={searchTerm ? 'Try adjusting your search.' : 'Get started by adding your first user.'}
                        action={!searchTerm ? openAddModal : undefined}
                        actionLabel="Add User"
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
                                    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                                                    title="Edit"
                                                    disabled={isLoading}
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user)}
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
                title={editingId ? 'Edit User' : 'Add User'}
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
                            placeholder="Enter user name"
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
                            placeholder="Enter user email"
                            required
                            className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {!editingId && (
                        <div>
                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                required={!editingId}
                                className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    )}

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
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
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

export default User
