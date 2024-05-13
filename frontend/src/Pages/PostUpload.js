import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const PostUpload = () => {
  const userId = useSelector((state) => state.userId.id);
  const [file, setFile] = useState(null);
  const [usetCaption,setUserCaption] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file == null) {
      toast.error("Please select an image to upload");
      return;
    }
    if (file.size > 200000) {
      toast.error("Image size should be less than 1KB");
      setFile(null)
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);
    formData.append("postData", usetCaption);
    try {
      const response = await axios.post(
        "http://192.168.1.6:3001/createPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap p-6 gap-x-6 md:gap-x-10 mx-auto justify-center bg-slate-50 shadow-md md:w-6/12 h-[300px] border-dotted border-richblack border-4">
        <div className="w-full md:w-auto">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-full h-auto max-w-full max-h-[180px] md:max-w-[200px] md:h-auto"
            />
          ) : (
            <div className="w-full h-[180px] bg-slate-100 flex items-center justify-center">
              <p className="text-center mt-2">No Image Selected</p>
            </div>
          )}
          <p className="mt-2">
            Caption :{" "}
            <input
              type="text"
              name="text"
              maxLength={30}
              minLength={1}
              value={usetCaption}
              onChange={(e) => setUserCaption(e.target.value)}
              className="rounded-[0.5rem] px-[12px] py-[6px] text-richblack-5 border mt-1 border-richblack-700"
            />
          </p>
        </div>
        <div className="w-full md:w-auto">
          <p className="font-extralight">
            Please upload square image, size less than 100KB.
          </p>
          <input
            type="file"
            className="block w-full mt-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            onChange={handleFileChange}
          />
          <button
            className="float-right bg-green-400 px-2 py-1 rounded-md text-white font-bold mt-2 md:mt-0"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
