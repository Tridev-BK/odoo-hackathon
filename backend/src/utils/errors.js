export class AppError extends Error {
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const notFound = (entity = "Resource") => new AppError(`${entity} not found`, 404);
