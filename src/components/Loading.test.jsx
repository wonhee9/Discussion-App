import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

/**
 * Skenario pengujian untuk Loading component:
 * 
 * - harus merender null (tidak menampilkan loading bar) jika isLoading bernilai false
 * - harus merender loading bar jika isLoading bernilai true
 */
describe('Loading component', () => {
  it('should render null when isLoading is false', () => {
    useSelector.mockReturnValue(false);
    const { container } = render(<Loading />);
    expect(container.firstChild).toBeNull();
  });

  it('should render loading bar when isLoading is true', () => {
    useSelector.mockReturnValue(true);
    const { container } = render(<Loading />);
    const loadingBar = container.querySelector('#loading-bar');
    expect(loadingBar).toBeInTheDocument();
  });
});
