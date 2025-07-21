import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event'

describe('TermsAndConditions', () => {
    it('should render with correct text and correct state', () => {
        render(<TermsAndConditions />)
        
        // Terms & Conditions appear
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/terms & conditions/i)
        
        // Unchecked checkbox appears
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()

        // Disabled submit button appears
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        // expect(button).toHaveTextContent(/submit/i)  // Button text may change in future
        expect(button).toBeDisabled()
    })

    it('should enable the button when checkmark is checked', async () => {
        // Arrange
        render(<TermsAndConditions />)
        
        // Act
        const checkbox = screen.getByRole('checkbox')
        const testUser = userEvent.setup()
        await testUser.click(checkbox)   
        
        // Assert
        expect(screen.getByRole('button')).toBeEnabled()
    })
})