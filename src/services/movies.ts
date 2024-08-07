// src/api/moviesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './api/baseQuery';
import { MoviesResponse } from '../types/movie';



export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getMoviesList: builder.query<MoviesResponse, number>({
      query: (page = 1) => ({
        url: `/discover/movie`,
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page,
          sort_by: 'popularity.desc',
        },
        method: 'GET',
      }),
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (search) => ({ url: `/search/movie?query=${search}`, method: 'GET' }),
      providesTags: ['Movies'],
    }),
    getMovieDetails: builder.query<any, string>({
      query: (id) => ({ url: `/movie/${id}`, method: 'GET' }),
    }),
  }),
});

export const { 
  useGetMoviesListQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery
 } = moviesApi;
