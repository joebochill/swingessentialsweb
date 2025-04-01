import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../../constants';
import { prepareHeaders } from './utils/prepareHeaders';
import { creditsApi } from './creditsService';

export type Level0PackageDetails = {
    id: number;
    name: number;
    description: string;
    shortcode: string;
    count: string;
    price: string;
};
export type Level1PackageDetails = Level0PackageDetails & {
    app_sku: string;
};
export type Discount = {
    type: 'amount' | 'percent';
    value: string;
    code: string;
};
export const packagesApi = createApi({
    reducerPath: 'packagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders,
    }),
    tagTypes: ['packages'],
    endpoints: (builder) => ({
        getPackages: builder.query<Level0PackageDetails[], void>({
            query: () => `packages`,
            providesTags: ['packages'],
        }),
        getDiscount: builder.mutation<Discount, string>({
            query: (code) => `packages/discounts/${code}`,
        }),
        addPackage: builder.mutation<void, Omit<Level1PackageDetails, 'id'>>({
            query: (newPackage) => ({
                url: `packages`,
                method: 'POST',
                body: newPackage,
            }),
            invalidatesTags: ['packages'],
        }),
        updatePackage: builder.mutation<void, Level1PackageDetails>({
            query: (updatedPackage) => ({
                url: `packages/${updatedPackage.id}`,
                method: 'PATCH',
                body: updatedPackage,
            }),
            invalidatesTags: ['packages'],
        }),
        removePackage: builder.mutation<void, { id: string | number }>({
            query: (deletedPackage) => ({
                url: `packages/${deletedPackage.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['packages'],
        }),
        createPayPalOrder: builder.mutation<{ id: string }, { packageId: number; coupon: string; total: number }>({
            query: (body) => ({
                url: `packages/order`,
                method: 'POST',
                body: body,
            }),
        }),
        capturePayPalOrder: builder.mutation<
            void,
            { orderId: string; packageId: number; coupon?: string; total: number }
        >({
            query: (body) => ({
                url: `packages/order/${body.orderId}/capture`,
                method: 'POST',
                body,
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(creditsApi.util.invalidateTags(['credits']));
                } catch (error) {
                    console.error('Error capturing PayPal order:', error);
                }
            },
        }),
        captureFreeOrder: builder.mutation<void, { packageId: number; coupon?: string; total: number }>({
            query: (body) => ({
                url: `packages/order/capture-free`,
                method: 'POST',
                body,
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(creditsApi.util.invalidateTags(['credits']));
                } catch (error) {
                    console.error('Error capturing free order:', error);
                }
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPackagesQuery,
    useAddPackageMutation,
    useUpdatePackageMutation,
    useRemovePackageMutation,
    useGetDiscountMutation,
    useCreatePayPalOrderMutation,
    useCapturePayPalOrderMutation,
    useCaptureFreeOrderMutation,
} = packagesApi;
