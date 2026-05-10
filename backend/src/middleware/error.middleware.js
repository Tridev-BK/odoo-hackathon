import { ZodError } from "zod";

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error instanceof ZodError) {
    return res.status(422).json({
      message: "Validation failed",
      details: error.errors.map((item) => ({
        path: item.path.join("."),
        message: item.message
      }))
    });
  }

  const statusCode = error.statusCode || 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    console.error(error);
  }

  return res.status(statusCode).json({
    message: isServerError ? "Internal server error" : error.message,
    ...(error.details ? { details: error.details } : {})
  });
};
