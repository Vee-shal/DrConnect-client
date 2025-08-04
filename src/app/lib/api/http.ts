import config from "@/app/config/config";
import axios, { AxiosResponse } from "axios";


export const BASE_URL: string =
  config.ENVIRONMENT == "development"
    ? config.API_URL.DEVELOPMENT
    : config.API_URL.LIVE;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

http.interceptors.request.use(
  (conf: any) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      conf.headers = {
        ...conf.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.status == 200) {
      return response?.data;
    }
  },
  (error) => {
    const err = error?.response?.data

    // Notiflix.Report.failure(
    //   "Something went wrong!",
    //   err?.message || "",
    //   "Okay"
    // );
    // if(error?.status == 401){
    //   localStorage.clear();
    //   window.location.href ="/login";
    // }
    console.log(error);
    return Promise.reject(err);
  }
);

