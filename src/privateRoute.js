// import Loader from "components/UI/loader";
// import { ROLES } from "constants/common";
// import NotVerified from "pages/accountNotVerified";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken } from "./utils/storage";
import { SET_USER } from "./store/user/user";
import { getUserApi } from "./services/auth";
import Loader from "./components/UI/loader";


 const ROLES = {
    admin: "admin",
    superAdmin: "superadmin",
    user: "user",
  };
const PrivateRoute = (props) => {
  const { role } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.user?.info);
  const token = getToken();
//   useEffect(() => {
//     if (userInfo && token) {
//       dispatch(fetchStoreCategories());
//       dispatch(fetchOrgStores());
//     }
//   }, [userInfo, token]);

  const getInfo = async () => {
    const { data, error } = await getUserApi();
    if (!error && data.success) {
      dispatch({ type: SET_USER, user: data?.data });
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!userInfo) {
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (!userInfo) {
    return <Loader loading={true} title="Loading User" />;
  }
  if (
    role &&
    userInfo &&
    userInfo.role?.toLowerCase() === role?.toLowerCase()
  ) {
    return (
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
    );
  } else if (role) {
    navigate("/");
    
  }
  return userInfo?.accountverified ||
    userInfo?.role?.toLowerCase() === ROLES.superAdmin ? (
    <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
  ) : (
    ''
    // <NotVerified />
  );
};

export default PrivateRoute;
