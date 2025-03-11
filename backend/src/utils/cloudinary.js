import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //uppload
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //successful
    console.log(`file has been uploaded successfully`, response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally stored temporary file
    return null;
  }
};

export { uploadOnCloudinary };
