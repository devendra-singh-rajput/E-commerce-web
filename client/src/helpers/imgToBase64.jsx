const imageToBase64 = async (image) => {
    if (!(image instanceof File)) {
        throw new Error("Input must be a File object");
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    return data;
}
export default imageToBase64;
