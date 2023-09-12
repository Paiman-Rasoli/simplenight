import { render, screen } from '@testing-library/react'
import Header from '../components/Header';

describe('Header component', () => {
    test('renders the header with the correct text', () => {
      render(<Header />);
  
      const titleElement = screen.getByText('Simplenight');
      expect(titleElement).toBeInTheDocument();
    });
  
    test('renders the header with the correct navigation links', () => {
      render(<Header />);
  
      const productsLink = screen.getByText('Products');
      const aboutLink = screen.getByText('About');
      const servicesLink = screen.getByText('Services');
  
      expect(productsLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(servicesLink).toBeInTheDocument();
    });
  });