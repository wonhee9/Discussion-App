import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

/**
 * Skenario pengujian untuk CommentInput:
 * 
 * - harus merender pesan ajakan masuk jika authUser bernilai null/undefined
 * - harus merender form textarea dan tombol kirim jika authUser ada
 * - harus memanggil addComment dengan konten yang tepat saat form di-submit
 * - harus mengosongkan nilai input textarea setelah form di-submit
 */
describe('CommentInput component', () => {
  it('should render login invitation text if user is not authenticated', () => {
    render(
      <MemoryRouter>
        <CommentInput authUser={null} addComment={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Masuk terlebih dahulu/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Tulis tanggapan Anda di sini...')).not.toBeInTheDocument();
  });

  it('should render input field and submit button when user is authenticated', () => {
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    render(
      <MemoryRouter>
        <CommentInput authUser={fakeUser} addComment={() => {}} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Masuk terlebih dahulu/i)).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tulis tanggapan Anda di sini...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kirim/i })).toBeInTheDocument();
  });

  it('should call addComment with correct content when form is submitted', async () => {
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    const addCommentMock = vi.fn();

    render(
      <MemoryRouter>
        <CommentInput authUser={fakeUser} addComment={addCommentMock} />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText('Tulis tanggapan Anda di sini...');
    const submitBtn = screen.getByRole('button', { name: /kirim/i });

    await userEvent.type(textarea, 'Tanggapan saya yang luar biasa');
    await userEvent.click(submitBtn);

    expect(addCommentMock).toHaveBeenCalledWith('Tanggapan saya yang luar biasa');
    expect(textarea.value).toBe('');
  });
});
