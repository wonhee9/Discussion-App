import { describe, it, expect } from 'vitest';
import isPreloadReducer, { setIsPreload } from './slice';

/**
 * Skenario pengujian untuk isPreloadReducer:
 * 
 * - harus mengembalikan initial state (true) ketika action tidak dikenal
 * - harus mengembalikan nilai boolean sesuai payload ketika diberikan action setIsPreload
 */
describe('isPreloadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    expect(isPreloadReducer(undefined, { type: 'UNKNOWN' })).toBe(true);
  });

  it('should return the boolean value when given the setIsPreload action', () => {
    expect(isPreloadReducer(true, setIsPreload(false))).toBe(false);
    expect(isPreloadReducer(false, setIsPreload(true))).toBe(true);
  });
});
