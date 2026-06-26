import { describe, it, expect } from 'vitest';
import authUserReducer, { setAuthUser, unsetAuthUser } from './slice';

/**
 * Skenario pengujian untuk authUserReducer:
 * 
 * - harus mengembalikan initial state (null) ketika action tidak dikenal
 * - harus mengembalikan data user ketika diberikan action setAuthUser
 * - harus mengembalikan null ketika diberikan action unsetAuthUser
 */
describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    expect(authUserReducer(undefined, { type: 'UNKNOWN' })).toBeNull();
  });

  it('should return the auth user data when given the setAuthUser action', () => {
    const user = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    expect(authUserReducer(null, setAuthUser(user))).toEqual(user);
  });

  it('should return null when given the unsetAuthUser action', () => {
    const user = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    expect(authUserReducer(user, unsetAuthUser())).toBeNull();
  });
});
