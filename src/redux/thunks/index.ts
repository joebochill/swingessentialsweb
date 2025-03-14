import { createAsyncThunk } from '@reduxjs/toolkit';
import { userDetailsApi } from '../apiServices/userDetailsService';
import { ASYNC_PREFIX } from '../../constants';
import { initialize, setToken } from '../slices/authSlice';
import { tipsApi } from '../apiServices/tipsService';
import { lessonsApi } from '../apiServices/lessonsService';
import { blogsApi } from '../apiServices/blogsService';

export const loadUserData = createAsyncThunk('auth/loadUserData', async (_, { dispatch }) => {
    try {
        dispatch(userDetailsApi.endpoints.getUserDetails.initiate());
        // dispatch(lessonsApi.endpoints.getCompletedLessons.initiate(0));
        // dispatch(loadLessons());
        // dispatch(loadCredits());
    } catch (error) {
        // TODO
        console.log('Error loading data after login:', error);
    }
});

export const initializeData = createAsyncThunk('app/initializeData', async (_, { dispatch }) => {
    try {
        const token = localStorage.getItem(`${ASYNC_PREFIX}token`);

        // If the user is still logged in when the application loads
        if (token) {
            dispatch(setToken(token));
            dispatch(loadUserData());
        }
        dispatch(initialize());
        dispatch(tipsApi.util.invalidateTags(['tips', 'tip']));
        dispatch(tipsApi.endpoints.getTips.initiate());
        dispatch(blogsApi.util.invalidateTags(['blogs', 'blog']));
        dispatch(blogsApi.endpoints.getBlogs.initiate());
        // dispatch(loadDiscounts()); // TODO should we be loading these or only for admin on the admin portal
    } catch (error) {
        // TODO
        console.log('Error loading user data:', error);
    }
});

export const clearProtectedDetails = createAsyncThunk('app/clearProtectedDetails', async (_, { dispatch }) => {
    try {
        dispatch(userDetailsApi.util.resetApiState());
        dispatch(lessonsApi.util.resetApiState());
        dispatch(tipsApi.util.resetApiState());
        dispatch(blogsApi.util.resetApiState());
        // credits
        // discounts
    } catch (error) {
        // TODO
        console.log('Error clearing protected details:', error);
    }
});
