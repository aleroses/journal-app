import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router";
import {
  TextField,
  Grid2,
  Button,
  Link,
  Box,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formDate = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const { email, password, handleInputChange } =
    useForm(formDate);

  const isAuthenticating = useMemo(
    () => status === "checking",
    [status]
  );

  // const { status } = useSelector((state) => state.auth);

  // console.log(email, password);

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password });
    //! This isn't the action to be dispatched
    // dispatch(checkingAuthentication());
    dispatch(
      startLoginWithEmailPassword({ email, password })
    );
  };

  const handleGoogleSignIn = () => {
    console.log("handleGoogleSignIn");

    dispatch(startGoogleSignIn());
  };

  // useEffect(() => {
  //   dispatch(checkingAuthentication());
  // }, []);

  return (
    <AuthLayout title="Login">
      <form
        action=""
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid2
          container
          // component="form"
          spacing={2}
        >
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="email@google.com"
              size="small"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="password"
              size="small"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Grid2>
        </Grid2>
        {/* New */}
        <Box>
          <Grid2
            size={{ xs: 12 }}
            display={!!errorMessage ? "" : "none"}
            sx={{
              mt: 1,
            }}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid2>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                startIcon={<Google />}
                onClick={handleGoogleSignIn}
              >
                Google
              </Button>
            </Grid2>
          </Grid2>
          <Grid2
            container
            // direction="row"
            justifyContent="end"
            sx={{ mt: 2 }}
          >
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/register"
            >
              Create an account.
            </Link>
          </Grid2>
        </Box>
      </form>
    </AuthLayout>
  );
};
