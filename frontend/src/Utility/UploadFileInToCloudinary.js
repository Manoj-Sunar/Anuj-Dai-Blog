export const UploadFileIntoCloudinary = async (setUploading, file) => {
  setUploading(true);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'anujDai_blog_img');
  formData.append('cloud_name', 'manojadmin');

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/manojadmin/image/upload", {
      method: 'POST',
      body: formData,
    });

    const uploadImgUrl = await res.json();

    if (res.ok) {
      const optimizedUrl = uploadImgUrl?.secure_url.replace('/upload/', '/upload/q_auto,f_auto,w_1280/');
      return optimizedUrl;
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    setUploading(false);
  }
};
