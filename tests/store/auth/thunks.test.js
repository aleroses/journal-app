import {
  loginWithEmailPassword,
  logoutFirebase,
  singInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Tests in AuthThunks.", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("It must invoke checkingCredentials.", async () => {
    // checkingAuthentication();
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      checkingCredentials()
    );
  });

  test("startGoogleSignIn must call checkingCredentials and login - Success", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    //  thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      checkingCredentials()
    );
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn must call checkingCredentials and logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "An error in Google",
    };

    await singInWithGoogle.mockResolvedValue(loginData);

    //  thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      checkingCredentials()
    );
    expect(dispatch).toHaveBeenCalledWith(
      logout(loginData.errorMessage)
    );
  });

  test("StartLoginWithEmailPassword must call checkingCredentials and login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
    };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      checkingCredentials()
    );
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout must call logoutFirebase, clearNotes and logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
