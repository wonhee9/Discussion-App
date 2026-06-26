import api from '../../utils/api';
import { receiveUsers } from '../users/slice';
import { receiveThreads } from '../threads/slice';
import { showLoading, hideLoading } from '../loading/slice';

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await api.getAllUsers();
    const threads = await api.getAllThreads();

    dispatch(receiveUsers(users));
    dispatch(receiveThreads(threads));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};
