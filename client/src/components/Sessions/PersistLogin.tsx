import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import {
  refreshAccessToken,
  loadingFalse,
} from "../../features/sessions/sessionSlice";
import { Toaster, toast } from "react-hot-toast";
import { RootState } from "../../store";
import LoadingModal from "../Shared/Loader/LoadingModal";

const PersistLogin = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch() as any;
  const { loading, accessToken, refreshToken, messages } = useSelector(
    (store: RootState) => store.sessions
  );

  // refresh access token if it refresh token exists
  useEffect(() => {
    if (!accessToken && refreshToken) {
      dispatch(refreshAccessToken({ refreshToken }));
    } else if (loading) {
      dispatch(loadingFalse());
    }
  }, []);

  // render session error messages
  useEffect(() => {
    // loop trough error messages and render them
    (messages?.error || []).forEach((message: string) => {
      toast.error(message);
    });

    // loop trough success messages and render them
    (messages.success || []).forEach((message: string) => {
      toast.success(message);
    });
  }, [messages]);

  return (
    <>
      {loading && pathname !== "/login" && <LoadingModal />}

      <Toaster />
      <Outlet />
    </>
  );
};

export default PersistLogin;
