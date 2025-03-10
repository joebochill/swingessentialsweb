// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from '../../constants';
import { prepareHeaders } from './utils/prepareHeaders';

export type TipDetails = {
    id: number;
    date: string;
    title: string;
    video: string;
    comments: string;
};
export type TipDetailsWithYear = TipDetails & {
    year: number;
};

// Define a service using a base URL and expected endpoints
export const tipsApi = createApi({
    reducerPath: 'tipsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        prepareHeaders,
    }),
    tagTypes: ['tips', 'tip'],
    endpoints: (builder) => ({
        getTips: builder.query<TipDetailsWithYear[], void>({
            query: () => `tips`,
            providesTags: ['tips'],
            transformResponse: (response: TipDetails[]) => {
                return response.map((tip) => {
                    return {
                        ...tip,
                        year: new Date(tip.date).getFullYear(),
                    };
                });
            },
        }),
        getTipById: builder.query<TipDetails, string | number>({
            query: (id) => `tips/${id}`,
            providesTags: ['tip'],
        }),
        addTip: builder.mutation<void, Omit<TipDetails, 'id'>>({
            query: (newTip) => ({
                url: `tips`,
                method: 'POST',
                body: newTip,
            }),
            invalidatesTags: ['tips'],
        }),
        updateTip: builder.mutation<void, TipDetails>({
            query: (updatedTip) => ({
                url: `tips/${updatedTip.id}`,
                method: 'PATCH',
                body: updatedTip,
            }),
            invalidatesTags: ['tips', 'tip'],
        }),
        removeTip: builder.mutation<void, { id: string | number }>({
            query: (deletedTip) => ({
                url: `tips/${deletedTip.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['tips', 'tip'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTipsQuery, useGetTipByIdQuery, useAddTipMutation, useUpdateTipMutation, useRemoveTipMutation } =
    tipsApi;
