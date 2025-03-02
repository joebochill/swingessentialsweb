// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils";
import { Testimonial } from "../../__types__";

type TestimonialsApiResponse = Testimonial[]

// Define a service using a base URL and expected endpoints
export const testimonialsApi = createApi({
  reducerPath: "testimonials",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getTestimonials: builder.query<TestimonialsApiResponse, void>({
      query: () => `testimonials`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTestimonialsQuery } = testimonialsApi;
