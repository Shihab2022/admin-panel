import axios from "axios";
import qs from "qs";
import { getToken } from "../utils/storage";


export const apiHandler = ({
  baseURL,
  params,
  path,
  formData,
  axiosMethod,
}) => {
  let parsedPath = baseURL + path;
  if (axiosMethod === "get" && Object.keys(params).length) {
    parsedPath = `${parsedPath}?${qs.stringify(params)}`;
  }
  const options = {
    headers: {
      "Content-Type": formData ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: axiosMethod,
    url: parsedPath,
    ...(axiosMethod === "get"
      ? params && { params: {} }
      : { data: formData ? params : JSON.stringify(params) }),
  };
  return axios(options)
    .then((res) => ({
      data: res.data,
      success: res?.data?.success === false ? false : true,
      error: res?.data?.error,
      params,
    }))
    .catch((err) => {
      const e = err.toJSON();
      if (e.status === 401) {
        window.location.href = "/login";
      } else {
        return {
          status: e.status,
          message: e.message,
          success: false,
          params,
        };
      }
    });
};
