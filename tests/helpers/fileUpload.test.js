import { fileUpload } from "../../src/helpers/fileUpload";

describe("Tests in fileUpload", () => {
  test("The file should upload correctly to Cloudinary.", async () => {
    const imageUrl =
      "https://www.online-image-editor.com/styles/2019/images/power_girl.png";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "photo.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");
  });
});
