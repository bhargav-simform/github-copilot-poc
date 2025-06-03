import React, { useState } from 'react'
import './Register.css'

interface User {
    id: string;
    username: string;
    email: string;
    mobile: string;
    city: string;
}

interface FormData {
    username: string;
    email: string;
    mobile: string;
    city: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    mobile?: string;
    city?: string;
    submit?: string;
}

const Register: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [form, setForm] = useState<FormData>({ 
        username: '', 
        email: '', 
        mobile: '', 
        city: '' 
    })
    const [editingId, setEditingId] = useState<string | null>(null)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validate = (name: string, value: string): string => {
        try {
            if (value.trim() === '') {
                return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
            }

            if (name === 'username') {
                if (value.length < 3) {
                    return 'Username must be at least 3 characters long'
                }
                if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    return 'Username can only contain letters, numbers, and underscores'
                }
            }
            
            if (name === 'email') {
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                    return 'Invalid email format'
                }
            }

            if (name === 'mobile') {
                if (!/^\d{10}$/.test(value)) {
                    return 'Mobile number must be 10 digits'
                }
            }

            if (name === 'city') {
                if (value.length < 2) {
                    return 'City name must be at least 2 characters'
                }
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    return 'City can only contain letters and spaces'
                }
            }
            
            return ''
        } catch (err) {
            console.error('Validation error:', err)
            return 'Validation error occurred'
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const { name, value } = e.target
            setForm(prev => ({ ...prev, [name]: value }))
            const error = validate(name, value)
            setErrors(prev => ({ ...prev, [name]: error }))
        } catch (err) {
            console.error('Error in handleChange:', err)
            setErrors(prev => ({ 
                ...prev, 
                submit: 'An error occurred while updating the form' 
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}
        let isValid = true

        Object.entries(form).forEach(([name, value]) => {
            const error = validate(name, value)
            if (error) {
                newErrors[name as keyof FormErrors] = error
                isValid = false
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        try {
            setIsSubmitting(true)

            if (!validateForm()) {
                return
            }

            if (editingId) {
                // Update existing user
                setUsers(prev => prev.map(user => 
                    user.id === editingId 
                        ? { ...form, id: editingId }
                        : user
                ))
                setEditingId(null)
            } else {
                // Add new user
                const newUser: User = {
                    ...form,
                    id: Date.now().toString()
                }
                setUsers(prev => [...prev, newUser])
            }

            // Clear form after successful submission
            setForm({ username: '', email: '', mobile: '', city: '' })
            
        } catch (err) {
            console.error('Submission error:', err)
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to submit the form. Please try again.'
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    const hasErrors = Object.values(errors).some(error => error)

    const handleEdit = (user: User) => {
        setForm(user)
        setEditingId(user.id)
    }

    const handleDelete = (id: string) => {
        setUsers(prev => prev.filter(user => user.id !== id))
    }

    const handleCancel = () => {
        setForm({ username: '', email: '', mobile: '', city: '' })
        setEditingId(null)
        setErrors({})
    }

    return (
        <div className="register-container">
            <h2>{editingId ? 'Edit User' : 'Register User'}</h2>
            
            <form onSubmit={handleSubmit} noValidate className="form-container">
                {errors.submit && (
                    <div role="alert" className="error">
                        {errors.submit}
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.username}
                            disabled={isSubmitting}
                        />
                        {errors.username && (
                            <div role="alert" className="error">
                                {errors.username}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.email}
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <div role="alert" className="error">
                                {errors.email}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            id="mobile"
                            type="tel"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.mobile}
                            disabled={isSubmitting}
                            placeholder="1234567890"
                        />
                        {errors.mobile && (
                            <div role="alert" className="error">
                                {errors.mobile}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                            aria-invalid={!!errors.city}
                            disabled={isSubmitting}
                        />
                        {errors.city && (
                            <div role="alert" className="error">
                                {errors.city}
                            </div>
                        )}
                    </div>
                </div>

                <div className="button-group">
                    <button 
                        type="submit" 
                        disabled={hasErrors || isSubmitting}
                        className="primary"
                    >
                        {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Register'}
                    </button>
                    {editingId && (
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="secondary"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {users.length > 0 && (
                <div>
                    <h3>Registered Users</h3>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.city}</td>
                                    <td className="action-buttons">
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            className="edit"
                                            disabled={isSubmitting}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="delete"
                                            disabled={isSubmitting}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Register