import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed");
  });

/*
import express from "express";
const app = express()

( async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",() => {
      console.log("Err: ", error)
      throw error
    })

    app.listen(process.env.PORT, ()=>{

    })
  }catch(error){
    console.error("ERROR: ",error)
    throw err
  }
})
 */
