import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Register from './Register'

// Copied validate function from Register.tsx for isolated testing
function validate(name: string, value: string) {
    let error = ''
    if (name === 'username') {
        if (value.length < 6) {
            error = 'Username must be at least 6 characters long'
        }
    }
    if (name === 'email') {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            error = 'Invalid email format'
        }
    }
    return error
}

describe('validate', () => {
    it('returns error if username is less than 6 characters', () => {
        expect(validate('username', 'abc')).toBe('Username must be at least 6 characters long')
    })

    it('returns no error if username is 6 or more characters', () => {
        expect(validate('username', 'abcdef')).toBe('')
    })

    it('returns error if email is invalid', () => {
        expect(validate('email', 'not-an-email')).toBe('Invalid email format')
        expect(validate('email', 'test@com')).toBe('Invalid email format')
    })

    it('returns no error if email is valid', () => {
        expect(validate('email', 'test@example.com')).toBe('')
    })

    it('returns no error for unrelated field', () => {
        expect(validate('other', 'value')).toBe('')
    })
})

describe('Register component', () => {
    it('renders form fields and button', () => {
        render(<Register />)
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()
    })

    it('shows error and disables button for invalid username', () => {
        render(<Register />)
        const usernameInput = screen.getByLabelText(/Username/i)
        fireEvent.change(usernameInput, { target: { value: 'abc', name: 'username' } })
        expect(screen.getByText(/Username must be at least 6 characters long/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Register/i })).toBeDisabled()
    })

    it('shows error and disables button for invalid email', () => {
        render(<Register />)
        const emailInput = screen.getByLabelText(/Email/i)
        fireEvent.change(emailInput, { target: { value: 'bademail', name: 'email' } })
        expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Register/i })).toBeDisabled()
    })

    it('enables button when both fields are valid', () => {
        render(<Register />)
        const usernameInput = screen.getByLabelText(/Username/i)
        const emailInput = screen.getByLabelText(/Email/i)
        fireEvent.change(usernameInput, { target: { value: 'abcdef', name: 'username' } })
        fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } })
        expect(screen.queryByText(/Username must be at least 6 characters long/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Invalid email format/i)).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Register/i })).not.toBeDisabled()
    })
})