import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsers } from '../users/slice';
import { receiveThreads } from '../threads/slice';
import { showLoading, hideLoading } from '../loading/slice';

vi.mock('../../utils/api', () => ({
  default: {
    getAllUsers: vi.fn(),
    getAllThreads: vi.fn(),
  },
}));

/**
 * Skenario pengujian untuk asyncPopulateUsersAndThreads thunk:
 * 
 * - harus men-dispatch tindakan dengan benar ketika pengambilan data berhasil:
 *   - dispatch(showLoading())
 *   - memanggil api.getAllUsers()
 *   - memanggil api.getAllThreads()
 *   - dispatch(receiveUsers(users))
 *   - dispatch(receiveThreads(threads))
 *   - dispatch(hideLoading())
 * - harus men-dispatch tindakan error dengan benar dan menampilkan alert ketika pengambilan data gagal:
 *   - dispatch(showLoading())
 *   - memanggil api.getAllUsers() yang melempar error
 *   - memanggil alert() dengan pesan kesalahan
 *   - dispatch(hideLoading())
 */
describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('should dispatch actions correctly when data fetching success', async () => {
    const fakeUsers = [{ id: 'user-1', name: 'User 1' }];
    const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }];

    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, receiveUsers(fakeUsers));
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveThreads(fakeThreads));
    expect(dispatch).toHaveBeenNthCalledWith(4, hideLoading());
  });

  it('should dispatch actions and show alert correctly when data fetching fails', async () => {
    const fakeError = new Error('Failed to fetch data');

    api.getAllUsers.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
  });
});
