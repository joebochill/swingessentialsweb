// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog } from '../../__types__'
import { BASEURL } from '../../constants';
import { prepareHeaders } from './utils';

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL, prepareHeaders }),
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => `blogs`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery } = blogApi;