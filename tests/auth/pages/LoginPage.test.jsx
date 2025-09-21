import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { startLoginWithEmailPassword } from "../../../src/store/auth/thunks";

// It is important to put the word "mock" first.
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () =>
      mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Testing on LoginPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("It should display the component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    // screen.debug();
    expect(
      screen.getAllByText("Login").length
    ).toBeGreaterThanOrEqual(1);
  });

  test("The Google button should call startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug()
    // console.log(store.getState());

    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    // screen.debug();

    // console.log(store.getState());

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
    // expect(mockStartGoogleSignIn).toHaveBeenCalledWith();
  });

  test("Submit must call startLoginWithEmailPassword.", () => {
    const email = "diego.more@gmail.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", {
      name: "Email",
    });

    // console.log(emailField);

    // screen.debug();

    fireEvent.change(emailField, {
      target: { name: "email", value: email },
    });

    // It didn't work for me.
    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    /* const passwordWrapper = screen.getByTestId("password");
    const passwordInput =
      passwordWrapper.querySelector("input");
    fireEvent.change(passwordInput, {
      target: { name: "password", value: password },
    });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    }); */

    expect(
      mockStartLoginWithEmailPassword
    ).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
