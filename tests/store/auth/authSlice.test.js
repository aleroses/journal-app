import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";

describe("Tests in authSlice", () => {
  test("It must return to its initial state and be called auth.", () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });
});
