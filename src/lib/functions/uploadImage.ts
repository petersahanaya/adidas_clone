export const uploadImageToCloudinary = async (
  files: File[]
): Promise<string[]> => {
  const uploadPromise = files.map((file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    return fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL as string, {
      method: "POST",
      headers: {},
      body: formData,
    }).then((res) => res.json()) as Promise<{ secure_url: string }>;
  });

  try {
    const resp = await Promise.all(uploadPromise);

    const imgUrls = resp.map((result) => result.secure_url);

    return imgUrls;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error(e as any);
  } finally {
  }
};
