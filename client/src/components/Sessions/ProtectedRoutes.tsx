import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { loading, accessToken } = useSelector(
    (store: RootState) => store.sessions
  );

  if (accessToken) {
    return <Outlet />;
  } else if (!accessToken && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (!loading) {
    toast.error("Ocorreu um erro");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
