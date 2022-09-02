import axios from "axios";
import { Token } from "../util/Constants";

const createAxios = axios.create({
  headers: {
    Authorization: Token,
    Accept: "application/Json",
    //"Content-Type": "application/Json",
  },
});

export const HttpService = createAxios;

HttpService.interceptors.request.use((req) => {
  return req;
});

HttpService.interceptors.response.use((res) => {
  return res?.data;
});
