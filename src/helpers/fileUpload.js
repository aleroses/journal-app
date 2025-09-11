export const fileUpload = async (file) => {
  if (!file) throw new Error("No files will be uploaded.");
  const cloudUrl =
    "https://api.cloudinary.com/v1_1/delkxyr6z/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok)
      throw new Error("The image could not be uploaded.");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};
