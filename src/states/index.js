import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/slice';
import usersReducer from './users/slice';
import threadsReducer from './threads/slice';
import threadDetailReducer from './threadDetail/slice';
import leaderboardsReducer from './leaderboards/slice';
import isPreloadReducer from './isPreload/slice';
import loadingReducer from './loading/slice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    isPreload: isPreloadReducer,
    loading: loadingReducer,
  },
});

export default store;
