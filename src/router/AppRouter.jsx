import { Navigate, Route, Routes } from "react-router";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
  const status = useCheckAuth();

  // const { status } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(FirebaseAuth, async (user) => {
  //     // console.log(user);

  //     if (!user) return dispatch(logout());

  //     const { uid, email, displayName, photoURL } = user;

  //     dispatch(
  //       login({ uid, email, displayName, photoURL })
  //     );
  //   });
  // }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      <Route
        path="/*"
        element={<Navigate to="/auth/login" />}
      />

      {/* Login and Registration */}
      {/* <Route path="auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
