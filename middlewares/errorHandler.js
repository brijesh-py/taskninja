// Internal Server Error Response
export const internalErrorResponse = (req, res, next) => {
  return res.status(500).json({
    success: false,
    error: {
      code: 500,
      message: "Internal server error",
    },
  });
};

// Check Required Field
export const checkRequiredFields = (fields) => {
  const errors = [];

  for (const [field, value] of Object.entries(fields)) {
    if (!value) {
      errors.push(`${field} is required`);
    }
  }
  return errors;
};

// Login middleware
export const loginHandler = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (accessToken) {
      return res.status(403).json({
        success: false,
        messsage: "user already logged in.",
      });
    }

    const { username, password } = req.body;

    const fields = { username, password };
    const errors = checkRequiredFields(fields);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    next();
  } catch (error) {
    return internalErrorResponse();
  }
};

// Signup middleware
export const signUpHandler = async (req, res, next) => {
  try {
    const { username, password, email, fullName } = req.body;

    const fields = { username, password, email };
    const errors = checkRequiredFields(fields);
    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        error: {
          code: 422,
          message: "Validation failed: Uername, email or password are required",
        },
      });
    }

    next();
  } catch (error) {
    return internalErrorResponse();
  }
};
