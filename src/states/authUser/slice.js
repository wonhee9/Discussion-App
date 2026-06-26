import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    setAuthUser(state, action) {
      return action.payload;
    },
    unsetAuthUser() {
      return null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncUnsetAuthUser = () => (dispatch) => {
  api.putAccessToken('');
  dispatch(unsetAuthUser());
};

export const asyncRegisterUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register({ name, email, password });
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export default authUserSlice.reducer;
