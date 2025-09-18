import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // preloadedState: {},
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
});
