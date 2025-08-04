import { http } from "@/app/lib/api/http";

export const _makeGetRequest = async (
  endpoint: string,
  params?: Record<string, any>
): Promise<any> => {
  try {
    const response = await http.get(endpoint, {
      params,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const _makePostRequest = async (
  endpoint: string,
  data: any
): Promise<any> => {
  try {
    const response = await http.post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const _makeDeleteRequest = async (
  endpoint: string,
  params?: Record<string, any>
): Promise<any> => {
  try {
    const response = await http.delete(endpoint, {
      params,
    });
    return response;
  } catch (error) {
    return error;
  }
};
