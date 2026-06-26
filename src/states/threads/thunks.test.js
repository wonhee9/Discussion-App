import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../utils/api';
import { asyncAddThread, addThread } from './slice';
import { showLoading, hideLoading } from '../loading/slice';

vi.mock('../../utils/api', () => ({
  default: {
    createThread: vi.fn(),
  },
}));

/**
 * Skenario pengujian untuk asyncAddThread thunk:
 * 
 * - harus men-dispatch tindakan dengan benar ketika pembuatan thread berhasil:
 *   - dispatch(showLoading())
 *   - memanggil api.createThread({ title, body, category })
 *   - dispatch(addThread(thread))
 *   - dispatch(hideLoading())
 * - harus men-dispatch tindakan error dengan benar dan menampilkan alert ketika pembuatan thread gagal:
 *   - dispatch(showLoading())
 *   - memanggil api.createThread() yang melempar error
 *   - memanggil alert() dengan pesan kesalahan
 *   - melempar error kembali
 *   - dispatch(hideLoading())
 */
describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('should dispatch actions correctly when thread creation success', async () => {
    const threadData = { title: 'Thread Title', body: 'Thread Body', category: 'General' };
    const fakeThread = { id: 'thread-1', ...threadData, upVotesBy: [], downVotesBy: [] };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = vi.fn();

    const result = await asyncAddThread(threadData)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(dispatch).toHaveBeenNthCalledWith(2, addThread(fakeThread));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    expect(result).toEqual(fakeThread);
  });

  it('should dispatch actions and show alert correctly when thread creation fails', async () => {
    const threadData = { title: 'Thread Title', body: 'Thread Body', category: 'General' };
    const fakeError = new Error('Failed to create thread');

    api.createThread.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    await expect(asyncAddThread(threadData)(dispatch)).rejects.toThrow('Failed to create thread');

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(api.createThread).toHaveBeenCalledWith(threadData);
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(2, hideLoading());
  });
});
