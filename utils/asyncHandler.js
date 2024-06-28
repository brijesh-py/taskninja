// Define a higher-order function to wrap async request handlers
const asyncHandler = (requestHandler) => {
  // Return a new function that wraps the request handler with error handling
  return (req, res, next) => {
    // Call the request handler and ensure any error is passed to next middleware
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Export the asyncHandler function for use in other modules
export { asyncHandler };
