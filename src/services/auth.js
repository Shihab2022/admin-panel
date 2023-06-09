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
  export const changePasswordApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/change-password",
      axiosMethod: "post",
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
  export const confirmOrgApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/update-org",
      axiosMethod: "post",
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
  export const addApiKeyApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "api-service/add",
      axiosMethod: "post",
      formData: false,
      params,
    });
    return res;
  };
  export const getSuperUsersApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/super-users",
      axiosMethod: "get",
      formData: false,
      params,
    });
    return res;
  };
  export const forgotPasswordApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/forgot-password",
      axiosMethod: "post",
      formData: false,
       params,
    });
    return res;
  };
  export const inviteUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/invite",
      axiosMethod: "post",
      formData: false,
      params,
    });
    return res;
  };
  export const inviteSuperUserApi = async (params) => {
    const res = await apiHandler({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      path: "auth/invite-super-user",
      axiosMethod: "post",
      formData: false,
      params,
    });
    return res;
  };