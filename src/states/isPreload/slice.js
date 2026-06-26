import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/slice';
import { showLoading, hideLoading } from '../loading/slice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload(state, action) {
      return action.payload;
    },
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = api.getAccessToken();
    if (token) {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    }
  } catch {
    api.putAccessToken('');
    dispatch(setAuthUser(null));
  } finally {
    dispatch(setIsPreload(false));
    dispatch(hideLoading());
  }
};

export default isPreloadSlice.reducer;
