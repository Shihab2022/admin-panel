export function setToken(userToken) {
    try {
      localStorage.setItem("token", userToken);
      return null;
    } catch (error) {
      return null;
    }
  }
  
  export function getToken() {
    try {
      const tokenString = localStorage.getItem("token");
      return tokenString;
    } catch (error) {
      return "";
    }
  }
  