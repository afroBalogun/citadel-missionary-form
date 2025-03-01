import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import attendanceApi from './features/attendance/attendanceApi';
import adminApi from './features/admin/adminApi';
import departmentApi from './features/departmentApi/departmentApi';

const store = configureStore({
    reducer: {
        [attendanceApi.reducerPath]: attendanceApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(attendanceApi.middleware).concat(departmentApi.middleware).concat(adminApi.middleware),
});

// Enable cache invalidation and refetching
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
