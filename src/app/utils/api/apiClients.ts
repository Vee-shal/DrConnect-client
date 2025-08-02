import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axiosinstance";

// Generic type for API responses
export type ApiResponse<T> = T;

// ✅ Strongly typed GET
export const _makeGetRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.get<T>(url);
    return res.data;
  } catch (err) {
    return handleAxiosError(err, "GET");
  }
};

// ✅ Strongly typed POST
export const _makePostRequest = async <T, D>(
  url: string,
  data: D
): Promise<ApiResponse<T>> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.post<T>(url, data);
    return res.data;
  } catch (err) {
    return handleAxiosError(err, "POST");
  }
};

// ✅ Strongly typed PUT
export const _makePutRequest = async <T, D>(
  url: string,
  data: D
): Promise<ApiResponse<T>> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.put<T>(url, data);
    return res.data;
  } catch (err) {
    return handleAxiosError(err, "PUT");
  }
};

// ✅ Strongly typed DELETE
export const _makeDeleteRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const res: AxiosResponse<T> = await axiosInstance.delete<T>(url);
    return res.data;
  } catch (err) {
    return handleAxiosError(err, "DELETE");
  }
};

// ✅ Central error handler with correct return type
const handleAxiosError = <T>(err: unknown, method: string): never => {
  const error = err as AxiosError;

  console.error(`[${method} ERROR]`, error.response?.data || error.message);
  throw error; // ensures type safety – this function *never* returns
};
