import { render, screen } from '@testing-library/react'
import UserAccount from '../../src/components/UserAccount'
import { User } from '../../src/entities'

const testUser1: User = { id: 1, name: "Jane", isAdmin: true }
const testUser2: User = { id: 2, name: "John", isAdmin: false }

describe('UserAccount', () => {
    it('should render user name', () => {
        render(<UserAccount user={testUser1} />)
        const userName = screen.getByText(testUser1.name)
        expect(userName).toBeInTheDocument()
    })

    it('should render edit button if user is admin', () => {
        render(<UserAccount user={testUser1} />)
        if (testUser1.isAdmin) { 
            const editButton = screen.getByRole('button')
            expect(editButton).toBeInTheDocument()
            expect(editButton).toHaveTextContent(/edit/i)
        }
    })

    it('should not render edit button if user is not admin', () => {
        render(<UserAccount user={testUser2} />)
        if (!testUser2.isAdmin) { 
            const editButton = screen.queryByRole('button')
            expect(editButton).not.toBeInTheDocument()
        }
    })
})