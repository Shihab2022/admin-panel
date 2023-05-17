const { apiHandler } = require("./instances");

export const loginUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "login",
      axiosMethod: "post",
      formData: false,
      params: params,
    });
    return res;
  };
  export const getUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/user",
      axiosMethod: "post",
      formData: false,
      params: params,
    });
    return res;
  };