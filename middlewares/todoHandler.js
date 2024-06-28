import { checkRequiredFields } from "./errorHandler.js";

export const todoHandler = async (req, res, next) => {
  const { title, description = "", completed = false } = req.body;

  const fields = { title };

  if (checkRequiredFields(fields).length > 0) {
    return res.status(400).json({
      success: false,
      message: "todo title are required",
    });
  } else if (title.length > 200 || description.length >  500) {
    return res.status(400).json({
      success: false,
      message: "todo title and description should be less than 100 characters and less than 500 characters",
    });
  } else {
    next();
  }
};
