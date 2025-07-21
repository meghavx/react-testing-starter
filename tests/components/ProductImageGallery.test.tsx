import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'

describe('ProductImageGallery', () => {
    it('should not render anything at all if the imageUrls array is empty', () => {
        const result = render(<ProductImageGallery imageUrls={[]} />)
        expect(result.container).toBeEmptyDOMElement()
    })

    it('should render a list of images if imageUrls array is not empty', () => {
        const testImageUrls: string[] = [
            'https://shorturl.at/w6OxQ',
            'https://shorturl.at/8fm7v',
            'https://shorturl.at/tMdpi',
        ] 
        render(<ProductImageGallery imageUrls={testImageUrls} />)
        const renderedImages = screen.getAllByRole('img')
        
        // Correct length assertion
        expect(renderedImages).toHaveLength(testImageUrls.length)
        
        // Correct src attribute assertion
        testImageUrls.forEach((url, i) => {
            expect(renderedImages[i]).toHaveAttribute('src', url)
        })
    })
})