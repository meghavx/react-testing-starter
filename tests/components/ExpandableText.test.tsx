import { render, screen } from '@testing-library/react'
import ExpandableText from '../../src/components/ExpandableText'
import userEvent from '@testing-library/user-event'

const shortText = "Text shorter than 255 chars."
const longText = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, dignissimos nihil inventore tempore similique doloremque? Molestias alias numquam, aspernatur, quidem, rem laboriosam itaque suscipit eum repudiandae harum aperiam deserunt et illo quae totam eos veniam similique? Pariatur molestias dolore, ad aperiam cupiditate exercitationem, illo iusto consectetur corporis dignissimos distinctio quae aut saepe repellat adipisci cum! Ullam expedita quaerat rem magnam nobis! Accusamus mollitia, deserunt dolorum facilis quod eaque doloremque laborum, nisi molestias atque cum cumque quaerat esse non dolorem culpa repellendus saepe totam vitae id eum fuga nobis itaque ad. Eligendi sapiente praesentium cumque mollitia maxime ipsa perspiciatis tempora eaque!"

describe('ExpandableText', () => {
    it('should render text with no button', () => {
        render(<ExpandableText text={shortText} />)
        
        // Completed text appears
        const text = screen.getByRole('article')
        expect(text).toBeInTheDocument()

        // No button shows up
        const button = screen.queryByRole('button')
        expect(button).not.toBeInTheDocument()
    })

    it('should render truncated text with show more button', () => {
        render(<ExpandableText text={longText} />)
        
        // Long text appears as truncated text 
        const article = screen.getByRole('article')
        expect(article).toBeInTheDocument()
        expect(article.innerHTML).not.toHaveLength(longText.length)

        // Show more button shows up
        const button = screen.getByRole('button')
        // expect(button).toBeInTheDocument() // getByRoll throws error if not found so this seems redundant
        expect(button).toHaveTextContent(/more/i)
    })

    it('should expand the text when show more button is clicked', async () => {
        // Arrange
        render(<ExpandableText text={longText} />)
        
        // Act
        const button = screen.getByRole('button')
        const testUser = userEvent.setup()
        await testUser.click(button)

        // Assert | Expanded text + show less button 
        expect(screen.getByText(longText)).toBeInTheDocument()
        expect(button).toHaveTextContent(/less/i)
    })

    it('should collapse the text when show less button is clicked', async () => {
        render(<ExpandableText text={longText} />)
        const testUser = userEvent.setup()

        const showMoreButton = screen.getByRole('button', { name: /more/i })
        await testUser.click(showMoreButton)
        expect(screen.getByText(longText)).toBeInTheDocument()
        
        const showLessButton = screen.getByRole('button', { name: /less/i })
        await testUser.click(showLessButton)
        expect(screen.getByRole('article').innerHTML).not.toHaveLength(longText.length)
    })
})