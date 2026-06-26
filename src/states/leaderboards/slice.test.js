import { describe, it, expect } from 'vitest';
import leaderboardsReducer, { receiveLeaderboards } from './slice';

/**
 * Skenario pengujian untuk leaderboardsReducer:
 * 
 * - harus mengembalikan initial state (array kosong) ketika action tidak dikenal
 * - harus mengembalikan list leaderboard ketika diberikan action receiveLeaderboards
 */
describe('leaderboardsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    expect(leaderboardsReducer(undefined, { type: 'UNKNOWN' })).toEqual([]);
  });

  it('should return the leaderboards data when given the receiveLeaderboards action', () => {
    const leaderboards = [
      {
        user: { id: 'user-1', name: 'User One', email: 'one@example.com', avatar: '' },
        score: 10,
      },
      {
        user: { id: 'user-2', name: 'User Two', email: 'two@example.com', avatar: '' },
        score: 5,
      },
    ];
    expect(leaderboardsReducer([], receiveLeaderboards(leaderboards))).toEqual(leaderboards);
  });
});
