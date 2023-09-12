import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '../components/reusable/Modal';

describe('Modal component', () => {

  global.ResizeObserver = require('resize-observer-polyfill')

  test('renders the modal with the correct title', () => {
    render(<Modal title="Test Modal" onClose={() => {}} visible={true}>Test Modal</Modal>);

    const titleElement = screen.getByTestId('Test Modal');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the modal with the close icon', () => {
    render(<Modal title="Test Modal" onClose={() => {}} visible={true}> Modal Product </Modal>);

    const closeIconElement = screen.getByTestId('close-icon');
    expect(closeIconElement).toBeInTheDocument();
  });

  test('calls the onClose function when the close icon is clicked', async () => {
    const onCloseMock = jest.fn();
    render(<Modal title="Test Modal" onClose={onCloseMock} visible={true}> Third Modal </Modal>);

    const closeIconElement = screen.getByTestId('close-icon');
    fireEvent.click(closeIconElement);
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
   });
  });
});