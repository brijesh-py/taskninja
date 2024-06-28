import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { internalErrorResponse } from "../middlewares/errorHandler.js";

// Create A New User
export const createUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password, fullName = "" } = req.body;

    const isUserExists = await User.findOne({ $or: [{ username }, { email }] });
    if (isUserExists) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: "Username or Email address already exists",
        },
      });
    }

    const newUser = await User({
      username,
      email,
      password,
      fullName,
    });

    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();


    res.status(201).json({
      success: true,
      data: {
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      message: "User created successfully",
    });
  } catch (error) {
    return internalErrorResponse(req, res, next);
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isValidUser = await User.findOne({ username: username });
    if (!isValidUser) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: "Invalid username or password",
        },
      });
    }

    const isValidPassword = await isValidUser.comparePassword(
      password,
      isValidUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: "Invalid username or password",
        },
      });
    }

    const accessToken = await isValidUser.gAccessToken(isValidUser._id);

    res.cookie("accessToken", accessToken).json({
      success: true,
      data: {
        username: isValidUser.username,
        email: isValidUser.email,
        accessToken: accessToken,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      },
      message: "Login successful",
    });
  } catch (error) {
    return internalErrorResponse(req, res, next);
  }
});
