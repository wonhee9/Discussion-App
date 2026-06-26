import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../utils/api';
import { asyncGetLeaderboards, receiveLeaderboards } from './slice';
import { showLoading, hideLoading } from '../loading/slice';

vi.mock('../../utils/api', () => ({
  default: {
    getLeaderboards: vi.fn(),
  },
}));

/**
 * Skenario pengujian untuk asyncGetLeaderboards thunk:
 * 
 * - harus men-dispatch tindakan dengan benar ketika pengambilan leaderboard berhasil:
 *   - dispatch(showLoading())
 *   - memanggil api.getLeaderboards()
 *   - dispatch(receiveLeaderboards(leaderboards))
 *   - dispatch(hideLoading())
 * - harus men-dispatch tindakan dengan benar dan memanggil alert ketika pengambilan leaderboard gagal:
 *   - dispatch(showLoading())
 *   - memanggil api.getLeaderboards() yang melempar error
 *   - memanggil alert() dengan pesan kesalahan
 *   - dispatch(hideLoading())
 */
describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('should dispatch actions correctly when leaderboard fetching success', async () => {
    const fakeLeaderboards = [{ user: { id: 'user-1', name: 'User 1' }, score: 10 }];

    api.getLeaderboards.mockResolvedValue(fakeLeaderboards);

    const dispatch = vi.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.getLeaderboards).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, receiveLeaderboards(fakeLeaderboards));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
  });

  it('should dispatch actions and show alert correctly when leaderboard fetching fails', async () => {
    const fakeError = new Error('Failed to fetch leaderboards');

    api.getLeaderboards.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.getLeaderboards).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
  });
});
