import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads(state, action) {
      return action.payload;
    },
    addThread(state, action) {
      state.unshift(action.payload);
    },
    toggleUpVoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
          thread.upVotesBy.push(userId);
        }
      }
    },
    toggleDownVoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
          thread.downVotesBy.push(userId);
        }
      }
    },
  },
});

export const { receiveThreads, addThread, toggleUpVoteThread, toggleDownVoteThread } = threadsSlice.actions;

export const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
    return thread;
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  const userId = authUser.id;
  const originalThreads = JSON.parse(JSON.stringify(getState().threads));

  dispatch(toggleUpVoteThread({ threadId, userId }));

  try {
    const thread = originalThreads.find((t) => t.id === threadId);
    if (thread.upVotesBy.includes(userId)) {
      await api.neutralVoteThread(threadId);
    } else {
      await api.upVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreads(originalThreads));
  }
};

export const asyncToggleDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  const userId = authUser.id;
  const originalThreads = JSON.parse(JSON.stringify(getState().threads));

  dispatch(toggleDownVoteThread({ threadId, userId }));

  try {
    const thread = originalThreads.find((t) => t.id === threadId);
    if (thread.downVotesBy.includes(userId)) {
      await api.neutralVoteThread(threadId);
    } else {
      await api.downVoteThread(threadId);
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreads(originalThreads));
  }
};

export default threadsSlice.reducer;
