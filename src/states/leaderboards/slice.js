import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboards(state, action) {
      return action.payload;
    },
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export const asyncGetLeaderboards = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(receiveLeaderboards(leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default leaderboardsSlice.reducer;
