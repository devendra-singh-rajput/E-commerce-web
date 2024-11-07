import { toast } from 'react-toastify';

const cloudName = 'dagcgd3is'; // Your Cloudinary cloud name
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const uploadImages = async (files) => {
  console.log("helper", files); // Log the files for debugging

  const uploadPromises = files.map((image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset","E-commerce");

    return fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json(); // Return response data for each successful upload
        } else {
          const errorData = await response.json();
          console.error("Upload failed:", errorData); // Log the error details
          toast.error(`Upload failed: ${errorData.error?.message}`);
          return null; // Return null for failed uploads
        }
      })
      .catch((error) => {
        console.error("Network error:", error); // Log network errors
        toast.error("Network error during image upload.");
        return null; // Return null for network failures
      });
  });

  // Wait for all uploads to complete and filter out any failed (null) responses
  const uploadedImages = await Promise.all(uploadPromises);
  const successfulUploads = uploadedImages.filter((data) => data !== null);

  // Provide feedback if any uploads failed
  if (successfulUploads.length < files.length) {
    toast.error("Some images failed to upload.");
  }

  return successfulUploads; // Return successful uploads
};

export default uploadImages;
