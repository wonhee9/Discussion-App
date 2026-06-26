import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from './Navigation';
import { asyncUnsetAuthUser } from '../states/authUser/slice';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../states/authUser/slice', () => ({
  asyncUnsetAuthUser: vi.fn(() => ({ type: 'UNSET_AUTH_USER' })),
}));

/**
 * Skenario pengujian untuk Navigation:
 * 
 * - harus merender navigasi dasar (link Threads dan Leaderboards)
 * - harus merender tombol Login jika user belum terautentikasi (authUser null)
 * - harus merender detail user dan tombol Logout jika user terautentikasi (authUser ada)
 * - harus memanggil dispatch(asyncUnsetAuthUser) saat tombol Logout diklik
 */
describe('Navigation component', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(dispatchMock);
  });

  it('should render basic navigation links (Threads & Leaderboards)', () => {
    useSelector.mockReturnValue(null);
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('Threads')).toBeInTheDocument();
    expect(screen.getByText('Leaderboards')).toBeInTheDocument();
  });

  it('should render Login link when user is not authenticated', () => {
    useSelector.mockReturnValue(null);
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render user avatar, name, and Logout button when user is authenticated', () => {
    const fakeUser = { id: 'user-1', name: 'John Doe', avatar: 'https://avatar-url.jpg' };
    useSelector.mockReturnValue(fakeUser);

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const avatarImg = screen.getByAltText('John Doe');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', fakeUser.avatar);
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('should call dispatch(asyncUnsetAuthUser) when Logout button clicked', async () => {
    const fakeUser = { id: 'user-1', name: 'John Doe', avatar: 'https://avatar-url.jpg' };
    useSelector.mockReturnValue(fakeUser);

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText('Logout');
    await userEvent.click(logoutBtn);

    expect(dispatchMock).toHaveBeenCalledWith(asyncUnsetAuthUser());
  });
});
