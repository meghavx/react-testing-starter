import { render, screen } from '@testing-library/react'
import TermsAndConditions from '../../src/components/TermsAndConditions'
import userEvent from '@testing-library/user-event'

describe('TermsAndConditions', () => {
    const renderComponent = () => {
        render(<TermsAndConditions />)
        return {
            heading: screen.getByRole('heading'),
            checkbox: screen.getByRole('checkbox'),
            button: screen.getByRole('button'),
        }
    }

    it('should render with correct text and correct state', () => {
        const { heading, checkbox, button } = renderComponent()
    
        expect(heading).toHaveTextContent(/terms & conditions/i)
        expect(checkbox).not.toBeChecked()
        expect(button).toBeDisabled()
    })

    it('should enable the button when checkmark is checked', async () => {
        // Arrange
        const { checkbox, button } = renderComponent()
        
        // Act
        const testUser = userEvent.setup()
        await testUser.click(checkbox)   
        
        // Assert
        expect(button).toBeEnabled()
    })
})