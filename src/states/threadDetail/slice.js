import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail(state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    addComment(state, action) {
      if (state) {
        state.comments.unshift(action.payload);
      }
    },
    toggleUpVoteThreadDetail(state, action) {
      const { userId } = action.payload;
      if (state) {
        if (state.upVotesBy.includes(userId)) {
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        } else {
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
          state.upVotesBy.push(userId);
        }
      }
    },
    toggleDownVoteThreadDetail(state, action) {
      const { userId } = action.payload;
      if (state) {
        if (state.downVotesBy.includes(userId)) {
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
        } else {
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
          state.downVotesBy.push(userId);
        }
      }
    },
    toggleUpVoteComment(state, action) {
      const { commentId, userId } = action.payload;
      if (state) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
          if (comment.upVotesBy.includes(userId)) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          } else {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
            comment.upVotesBy.push(userId);
          }
        }
      }
    },
    toggleDownVoteComment(state, action) {
      const { commentId, userId } = action.payload;
      if (state) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
          if (comment.downVotesBy.includes(userId)) {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          } else {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            comment.downVotesBy.push(userId);
          }
        }
      }
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  toggleUpVoteComment,
  toggleDownVoteComment,
} = threadDetailSlice.actions;

export const asyncGetThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetail());
  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetail(threadDetail));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const comment = await api.createComment({ threadId, content });
    dispatch(addComment(comment));
  } catch (error) {
    alert(error.message);
    throw error;
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncToggleUpVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  if (!threadDetail) return;

  const userId = authUser.id;
  const originalThreadDetail = JSON.parse(JSON.stringify(threadDetail));

  dispatch(toggleUpVoteThreadDetail({ userId }));

  try {
    if (originalThreadDetail.upVotesBy.includes(userId)) {
      await api.neutralVoteThread(threadDetail.id);
    } else {
      await api.upVoteThread(threadDetail.id);
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreadDetail(originalThreadDetail));
  }
};

export const asyncToggleDownVoteThreadDetail = () => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  if (!threadDetail) return;

  const userId = authUser.id;
  const originalThreadDetail = JSON.parse(JSON.stringify(threadDetail));

  dispatch(toggleDownVoteThreadDetail({ userId }));

  try {
    if (originalThreadDetail.downVotesBy.includes(userId)) {
      await api.neutralVoteThread(threadDetail.id);
    } else {
      await api.downVoteThread(threadDetail.id);
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreadDetail(originalThreadDetail));
  }
};

export const asyncToggleUpVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  if (!threadDetail) return;

  const userId = authUser.id;
  const originalThreadDetail = JSON.parse(JSON.stringify(threadDetail));

  dispatch(toggleUpVoteComment({ commentId, userId }));

  try {
    const comment = originalThreadDetail.comments.find((c) => c.id === commentId);
    if (comment.upVotesBy.includes(userId)) {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreadDetail(originalThreadDetail));
  }
};

export const asyncToggleDownVoteComment = (commentId) => async (dispatch, getState) => {
  const { authUser, threadDetail } = getState();
  if (!authUser) {
    alert('Anda harus login terlebih dahulu!');
    return;
  }

  if (!threadDetail) return;

  const userId = authUser.id;
  const originalThreadDetail = JSON.parse(JSON.stringify(threadDetail));

  dispatch(toggleDownVoteComment({ commentId, userId }));

  try {
    const comment = originalThreadDetail.comments.find((c) => c.id === commentId);
    if (comment.downVotesBy.includes(userId)) {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    } else {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    }
  } catch (error) {
    alert(error.message);
    dispatch(receiveThreadDetail(originalThreadDetail));
  }
};

export default threadDetailSlice.reducer;
