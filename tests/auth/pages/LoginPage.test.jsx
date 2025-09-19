import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    preloadedState: {
      auth: notAuthenticatedState,
    },
  },
});

describe("Testing on LoginPage", () => {
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

    const googleBtn = screen.getByLabelText("google-btn");

    fireEvent.click(googleBtn);

    // screen.debug();
  });
});
