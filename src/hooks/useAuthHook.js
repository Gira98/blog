import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetCurrentUserQuery } from "../store/authApi";
import { logOut, setCredentials } from "../slices/authSlice";

function useAuthHook() {
  const dispatch = useDispatch();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const data = await getCurrentUser().unwrap();
        dispatch(
          setCredentials({ user: data.user, token: data.user?.token || token })
        );
      } catch (e) {
        console.error(e);
        dispatch(logOut());
      }
    };
    checkAuth();
  }, [dispatch, getCurrentUser]);
}

export default useAuthHook;
