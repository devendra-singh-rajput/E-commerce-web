import { toast } from 'react-toastify';
const cloudName = 'dagcgd3is'; // Your Cloudinary cloud name
// console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "E-commerce");
    
    const dataResponse = await fetch(url, {
        method: "POST",
        body: formData,
    }); 
    if (dataResponse.ok) {
        toast.success("Image uploaded..");
        
    } else {
        toast.error("Image in not uploaded..");
    }
    
    return dataResponse.json();
};

export default uploadImage;
