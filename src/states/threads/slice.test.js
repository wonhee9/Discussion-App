import { describe, it, expect } from 'vitest';
import threadsReducer, {
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
} from './slice';

/**
 * Skenario pengujian untuk threadsReducer:
 * 
 * - harus mengembalikan initial state (array kosong) ketika action tidak dikenal
 * - harus mengembalikan list threads ketika diberikan action receiveThreads
 * - harus menambahkan thread baru ke awal array ketika diberikan action addThread
 * - harus mengubah upVote pada thread secara benar ketika diberikan action toggleUpVoteThread:
 *   - jika user belum meng-vote atau telah meng-downvote, user ditambahkan ke upVotesBy
 *   - jika user sudah meng-upvote, user dihapus dari upVotesBy
 * - harus mengubah downVote pada thread secara benar ketika diberikan action toggleDownVoteThread:
 *   - jika user belum meng-vote atau telah meng-upvote, user ditambahkan ke downVotesBy
 *   - jika user sudah meng-downvote, user dihapus dari downVotesBy
 */
describe('threadsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    expect(threadsReducer(undefined, { type: 'UNKNOWN' })).toEqual([]);
  });

  it('should return the threads data when given the receiveThreads action', () => {
    const threads = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1', upVotesBy: [], downVotesBy: [] },
    ];
    expect(threadsReducer([], receiveThreads(threads))).toEqual(threads);
  });

  it('should prepend the new thread to the state when given the addThread action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', body: 'Body 1' },
    ];
    const newThread = { id: 'thread-2', title: 'Thread 2', body: 'Body 2' };
    const expectedState = [newThread, ...initialState];
    expect(threadsReducer(initialState, addThread(newThread))).toEqual(expectedState);
  });

  it('should handle toggleUpVoteThread when user has not voted yet', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] },
    ];
    const action = toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' });
    const resultState = threadsReducer(initialState, action);
    expect(resultState[0].upVotesBy).toContain('user-1');
    expect(resultState[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle toggleUpVoteThread when user already upvoted (should remove upvote)', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-1' });
    const resultState = threadsReducer(initialState, action);
    expect(resultState[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle toggleDownVoteThread when user already downvoted (should remove downvote)', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: ['user-1'] },
    ];
    const action = toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-1' });
    const resultState = threadsReducer(initialState, action);
    expect(resultState[0].downVotesBy).not.toContain('user-1');
  });
});
