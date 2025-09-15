import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("Tests in authSlice", () => {
  test("It must return to its initial state and be called auth.", () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("It must perform authentication.", () => {
    const state = authSlice.reducer(
      initialState,
      login(demoUser)
    );
    // console.log(login(demoUser));

    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("It must log out without arguments.", () => {
    // authenticatedState // logout without arguments
    const state = authSlice.reducer(
      authenticatedState,
      logout()
    );

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("It should log it out and display an error message.", () => {
    // authenticatedState // logout without arguments
    const errorMessage = "The credentials are not correct.";

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("It must change the status to checking.", () => {
    const state = authSlice.reducer(
      authenticatedState,
      checkingCredentials()
    );

    expect(state.status).toBe("checking");
  });
});
