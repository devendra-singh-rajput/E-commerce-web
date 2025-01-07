import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signinGif from '../assest/signin.gif'
import uploadImages from '../helpers/uploadImage';
import summmryApi from "../common";
import Context from "../context";

const EditProfile = () => {
  const context = useContext(Context);
  const user = useSelector((state) => state?.user?.user); // Get user from Redux state
  const [data, setData] = useState({ ...user });
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle profile picture upload
  const handleUploadPic = async (e) => {
    const file = [e.target.files[0]];
    if (file[0]) {
      setImgLoading(true);
      try {
        const profilePicArray = await uploadImages(file); // Your upload function
        const profilePic = profilePicArray[0].url;
        setData((prev) => ({
          ...prev,
          profilePic,
        }));
        profilePic && setImgLoading(false);
        toast.success("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error uploading the image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("userDetail.")) {
      const key = name.split(".")[1];
      setData((prev) => ({
        ...prev,
        userDetail: { ...prev.userDetail, [key]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(summmryApi.EditProfile.url,data,{  withCredentials: true}); // Adjust API endpoint as needed
      toast.success("Profile updated successfully!");
      context.fetchUserDetail();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 animate-fadeIn transform transition duration-500">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Edit Your Profile
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-28 h-28">
                <img
                  src={data.profilePic || signinGif}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
                {imgLoading && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleUploadPic}
                  disabled={imgLoading}
                />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">
                  {data.userName}
                </span>
              </div>
              <button
                onClick={() => navigate("/OrderHistoryPage")}
                className="bg-gradient-to-r from-primary to-yellow-600 hover:from-yellow-600 hover:to-primary text-white py-2 px-6 rounded-lg shadow-md font-medium transition-transform transform hover:scale-105"
              >
                View Order History
              </button>
            </div>

            {/* Vertical Partition */}
            <div className="w-[1px] bg-gray-300 "></div>

            {/* Input Fields Section */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={data.userName}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="userDetail.address"
                  value={data.userDetail?.address || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="userDetail.city"
                  value={data.userDetail?.city || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="userDetail.state"
                  value={data.userDetail?.state || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="userDetail.pincode"
                  value={data.userDetail?.pincode || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="userDetail.phoneNumber"
                  value={data.userDetail?.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alternate Phone Number
                </label>
                <input
                  type="text"
                  name="userDetail.alternatePhoneNumber"
                  value={data.userDetail?.alternatePhoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring hover:border-primary shadow-md"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className={`w-full py-2 px-3 rounded-lg text-primary font-semibold text-lg transition-transform transform hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "border-2 bg-white border-primary font-semibold  hover:bg-primary hover:text-white"
                  }`}
                  disabled={loading||imgLoading}
                >
                  {loading ? "Updating..." :imgLoading?"Image uploading...": "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
