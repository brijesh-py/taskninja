import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";

dotenv.config();

// Connect to Database
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
