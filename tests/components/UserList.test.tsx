import { render, screen } from '@testing-library/react'
import UserList from '../../src/components/UserList'
import { User } from '../../src/entities'

describe('UserList', () => {
    it('should render no users when the users array is empty', () => {
        render(<UserList users={[]} />)
        expect(screen.getByText(/no users/i)).toBeInTheDocument()
    })

    it('should render list of users with href links if the users array is not empty ', () => {
        const testUsers: User[] = [
            { id: 1, name: "Jane", isAdmin: true },
            { id: 2, name: "John", isAdmin: false },
            { id: 3, name: "Kelly", isAdmin: false },
        ]
        render(<UserList users={testUsers} />)
        testUsers.forEach(user => {
            const link = screen.getByRole('link', { name: user.name })
            expect(link).toBeInTheDocument()
            expect(link).toHaveAttribute('href', `/users/${user.id}`)
        })
    })
})