import { AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { axiosInstance } from './axiosInstance';

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async (args) => {
    try {
      const result = await axiosInstance(args);
      return { data: result.data };
    } catch (axiosError: any) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
