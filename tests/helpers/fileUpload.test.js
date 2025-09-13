import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "delkxyr6z",
  api_key: "423579532613278",
  api_secret: "k-ZUekWF7jbsR1Jm91rIe2P5cd8",
  secure: true,
});

describe("Tests in fileUpload", () => {
  test("The file should upload correctly to Cloudinary.", async () => {
    const imageUrl =
      "https://www.online-image-editor.com/styles/2019/images/power_girl.png";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "photo.png");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // console.log(url);
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(
      ".png",
      ""
    );

    // const cloudResp = await cloudinary.api.delete_resources(
    //   ["journal/" + imageId],
    //   {
    //     resource_type: "image",
    //   }
    // );

    const cloudResp = await cloudinary.api.delete_resources([
      imageId,
    ]);

    console.log({ cloudResp });
  });

  test("It must return null.", async () => {
    const file = new File([], "photo.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
