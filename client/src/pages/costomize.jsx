import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import summmryApi from "../common";
import uploadImages from "../helpers/uploadImage";

const ImageUploader = ({ label, images, setImages, inputId }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    setIsUploading(true);
    const files = Array.from(event.target.files);
    try {
      const uploadedImages = await uploadImages(files);
      const newImageUrls = uploadedImages.map((response) => response.url);
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
    } catch (error) {
      console.error("Failed to upload images:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-2">{label}</label>
      <input
        type="file"
        id={inputId}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor={inputId}>
        <div className="p-4 bg-slate-100 border rounded h-40 w-full flex justify-center items-center cursor-pointer">
          {isUploading ? (
            <div className="loader w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="text-slate-500 flex justify-center items-center flex-col ">
              <span className="text-3xl">
                <FaCloudUploadAlt />
              </span>
              <p className="text-sm">Upload {label}</p>
            </div>
          )}
        </div>
      </label>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group  bg-slate-200 rounded shadow-md">
            <img
              src={image}
              alt={`${label} Preview`}
              className="w-full h-24 object-contain rounded border shadow-sm mix-blend-multiply"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute rounded-full px-1 top-1 right-1  font-semibold text-primary bg-slate-200 hover:bg-primary hover:text-white"
            >
              &#x2715;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryManager = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-2">Manage Categories</label>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="border border-gray-300 p-2 rounded flex-1"
        />
        <button
          onClick={handleAddCategory}
          className="font-semibold border-2 border-primary text-primary px-6 py-2 rounded hover:bg-primary hover:text-white"
        >
          Add
        </button>
      </div>
      {categories.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2 ">
          {categories.map((category, index) => (
            <li key={index} className="relative text-sm bg-gray-100 px-3 pr-7 border py-1 rounded shadow-md">
              {category}
              <button
                onClick={() => removeCategory(index)}
                className="absolute top-1 right-2 font-semibold text-red-500"
              >
                &#x2715;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomizationPage = () => {
  const [categories, setCategories] = useState([]);
  const [logo, setLogo] = useState(null);
  const [mobileBanners, setMobileBanners] = useState([]);
  const [desktopBanners, setDesktopBanners] = useState([]);
  const [isDeletingLogo, setIsDeletingLogo] = useState(false);

  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        const { data } = await axios.get(summmryApi.getCustomization.url, {
          withCredentials: true,
        });
        setCategories(data.categories || []);
        setLogo(data.logo || null);
        setMobileBanners(data.banners?.mobile || []);
        setDesktopBanners(data.banners?.desktop || []);
      } catch (error) {
        console.error("Failed to fetch customization:", error);
      }
    };

    fetchCustomization();
  }, []);

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedImage = await uploadImages([file]);
      setLogo(uploadedImage[0]?.url || null);
    }
  };

  const handleRemoveLogo = async () => {
    setLogo("");
    setIsDeletingLogo(true);
    try {
      await axios.post(
        summmryApi.updateCustomization.url,
        { logo: null },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to delete logo:", error);
      alert("Failed to delete logo. Please try again.");
    } finally {
      setIsDeletingLogo(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        logo,
        categories,
        banners: {
          mobile: mobileBanners,
          desktop: desktopBanners,
        },
      };

      await axios.post(summmryApi.updateCustomization.url, payload, {
        withCredentials: true,
      });
      alert("Customization saved successfully!");
    } catch (error) {
      console.error("Failed to save customization:", error);
      alert("Failed to save customization. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="bg-white py-4 px-4 flex justify-between items-center shadow-md mb-4">
        <h1 className="font-bold text-lg">Website Customization</h1>
      </div>

      <div className="bg-white p-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <label className="block text-lg font-semibold mb-2">Upload Logo</label>
            <div className="flex items-center gap-4">
              <label htmlFor="uploadLogo" className="cursor-pointer">
                <div className="p-2 bg-slate-100 border rounded flex justify-between items-center h-32 w-32">
                  <span className="text-slate-500 text-3xl pl-10">
                    <FaCloudUploadAlt />
                  </span>
                </div>
                <input
                  type="file"
                  id="uploadLogo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
              {logo && (
                <div className="relative h-32 w-32">
                  <img
                    src={logo}
                    alt="Logo Preview"
                    className="object-contain h-full w-full rounded border"
                  />
                  <button
                    onClick={handleRemoveLogo}
                    disabled={isDeletingLogo}
                    className={`absolute top-1 right-1 ${
                      isDeletingLogo
                        ? "bg-gray-400 cursor-not-allowed"
                        : "rounded-full px-1 top-1 right-1 text-sm text-primary bg-white hover:bg-primary hover:text-white"
                    } p-1 rounded-full`}
                  >
                    {isDeletingLogo ? "..." : "✖"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <CategoryManager categories={categories} setCategories={setCategories} />
        </div>

        <div className="mb-6">
          <ImageUploader
            label="Desktop Banners"
            images={desktopBanners}
            setImages={setDesktopBanners}
            inputId="desktopBanners"
          />
          <ImageUploader
            label="Mobile Banners"
            images={mobileBanners}
            setImages={setMobileBanners}
            inputId="mobileBanners"
          />
        </div>

        <button
          onClick={handleSave}
          className="font-semibold border-2 border-primary text-primary px-6 py-2 rounded hover:bg-primary hover:text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CustomizationPage;
