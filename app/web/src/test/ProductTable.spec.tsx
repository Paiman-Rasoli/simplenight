import { render, screen, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsTable from '../components/product/ProductsTable';
import { mockProducts } from './__mock__';

// Mock the useFetch hook
jest.mock('../hooks/use-fetch', () => ({
      __esModule: true,
      default: () => ({
        data: mockProducts,
        isLoading: false,
        error: null,
        doRefetch: jest.fn(),
      }),
 }));

describe("ProductTable component" , () => {

global.ResizeObserver = require('resize-observer-polyfill')

test('renders products table', async () => {
  render(<ProductsTable />);

  // Assert that the loader is not displayed
  expect(screen.queryByText('Loading...')).toBeNull();

  // Assert that the add new product button is displayed
  expect(screen.getByRole('button', { name: 'Add New Product' })).toBeInTheDocument();

  // Assert that the table headers are displayed
  expect(screen.getByText('ID')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Price')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByText('Produced')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();
});

// test('handles delete button click', async () => {
//   render(<ProductsTable />);

//   // Mock the fetch function
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ deleted: true }),
//     })
//   ) as jest.Mock<Promise<Response>>;

//   // Click the delete button
//   userEvent.click(screen.getByText("Delete"));

//   // Assert that the delete request was sent
//   expect(global.fetch).toHaveBeenCalledWith('http://example.com/products/1', {
//     method: 'DELETE',
//   });

//   // Assert that the success alert is displayed
//   await waitFor(() =>{
//       expect(screen.getByText('Product deleted successfully.')).toBeInTheDocument()
//     }
//   );
// });

test('handles edit button click', async () => {
  render(<ProductsTable />);

  // Assert that the edit modal is not initially displayed
  expect(screen.queryByRole('dialog')).toBeNull();

  // Click the edit button
  userEvent.click(screen.getByText('Edit'))

   await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
   });
 });

})
