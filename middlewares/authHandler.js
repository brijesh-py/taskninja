import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const authHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(400).json({
      success: false,
      messsage: "Unauthorized Access, token is required",
    });
  }

  const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (decode._id && (await User.findOne({ _id: decode._id }))) {
    req.body._id = decode._id;
    next();
  } else {
    return res.status(400).json({
      success: false,
      messsage: "Unauthorized Access, token is required",
    });
  }
};
