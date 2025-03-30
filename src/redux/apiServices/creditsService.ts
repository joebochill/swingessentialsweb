import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../../constants';
import { prepareHeaders } from './utils/prepareHeaders';

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        prepareHeaders,
    }),
    tagTypes: ['credits'],
    endpoints: (builder) => ({
        getCredits: builder.query<{ count: number }, void>({
            query: () => `credits`,
            providesTags: ['credits'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCreditsQuery } = creditsApi;
