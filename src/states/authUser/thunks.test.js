import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUser } from './slice';
import { showLoading, hideLoading } from '../loading/slice';

vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

/**
 * Skenario pengujian untuk asyncSetAuthUser thunk:
 * 
 * - harus men-dispatch tindakan dengan benar ketika login dan fetch profil berhasil:
 *   - dispatch(showLoading())
 *   - memanggil api.login({ email, password })
 *   - memanggil api.putAccessToken(token)
 *   - memanggil api.getOwnProfile()
 *   - dispatch(setAuthUser(user))
 *   - dispatch(hideLoading())
 * - harus men-dispatch tindakan error dengan benar ketika proses gagal:
 *   - dispatch(showLoading())
 *   - memanggil api.login({ email, password }) yang melempar error
 *   - memanggil alert() dengan pesan kesalahan
 *   - melempar error kembali
 *   - dispatch(hideLoading())
 */
describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('should dispatch actions correctly when data fetching success', async () => {
    const fakeToken = 'fakeToken123';
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    const credentials = { email: 'john@example.com', password: 'password' };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser(credentials)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.login).toHaveBeenCalledWith(credentials);
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUser(fakeUser));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('should dispatch actions and show alert correctly when data fetching fails', async () => {
    const credentials = { email: 'john@example.com', password: 'password' };
    const fakeError = new Error('Invalid credentials');

    api.login.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    await expect(asyncSetAuthUser(credentials)(dispatch)).rejects.toThrow('Invalid credentials');

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.login).toHaveBeenCalledWith(credentials);
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
  });
});
