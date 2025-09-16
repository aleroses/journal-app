import { startNewNote } from "../../../src/store/journal/thunks";

describe("Tests in Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote must create a new blank note", async () => {
    const uid = "TEST-UID";

    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);
  });
});
