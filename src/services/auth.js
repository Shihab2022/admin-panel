const { apiHandler } = require("./instances");

export const loginUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "login",
      axiosMethod: "post",
      formData: false,
      params,
    });
    return res;
  };
  export const getUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/user",
      axiosMethod: "post",
      formData: false,
      params,
    });
    return res;
  };
  export const getUsersApiHandler = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/users",
      axiosMethod: "get",
      formData: false,
      params,
    });
    return res;
  };
  export const getOrgsApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/orgs",
      axiosMethod: "get",
      formData: false,
      params,
    });
    return res;
  };

  export const apiKeysApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "api-service/list",
      axiosMethod: "get",
      formData: false,
      params,
    });
    return res;
  };