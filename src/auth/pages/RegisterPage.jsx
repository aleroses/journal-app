import { useMemo, useState } from "react";
import {
  Button,
  Grid2,
  TextField,
  Link,
  Typography,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks.js";

const formData = {
  email: "aleghost@google.com",
  password: "123456",
  displayName: "Ale Ghost",
};

const formValidations = {
  email: [
    (value) => value.includes("@"),
    "The mail must have an @",
  ],
  password: [
    (value) => value.length >= 6,
    "The password must be longer than 6 letters",
  ],
  displayName: [
    (value) => value.length >= 1,
    "The name is mandatory",
  ],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(
    (state) => state.auth
  );

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    handleInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      {/* <h1>Form: {isFormValid ? "Valid" : "Incorrect"}</h1> */}
      <form
        action=""
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid2
          container
          // component="form"
          spacing={2}
        >
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              id="fullname"
              label="Full name"
              type="text"
              placeholder="Your full name"
              size="small"
              fullWidth
              name="displayName"
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              onChange={handleInputChange}
            />
          </Grid2>
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
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              onChange={handleInputChange}
            />
          </Grid2>
        </Grid2>

        {/* New */}
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2
            size={{ xs: 12 }}
            display={!!errorMessage ? "" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Button
              disabled={isCheckingAuthentication}
              type="submit"
              variant="contained"
              fullWidth
            >
              Create account
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 container justifyContent="end" sx={{ mt: 2 }}>
          <Typography sx={{ mr: 1 }}>
            Already have an account?
          </Typography>
          <Link
            component={RouterLink}
            color="inherit"
            to="/auth/login"
          >
            Login
          </Link>
        </Grid2>
      </form>
    </AuthLayout>
  );
};
