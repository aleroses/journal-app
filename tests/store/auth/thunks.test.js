import { singInWithGoogle } from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../../src/store/auth/thunks";
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
});
