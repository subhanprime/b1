/* eslint-disable @typescript-eslint/comma-dangle */
class AppError extends Error {
  public message: string;

  public code: number;

  public httpCode: number;

  constructor(message: string, code: number, httpCode: number) {
    super();
    Error.captureStackTrace(this);
    this.message = message;
    this.code = code;
    this.httpCode = httpCode;
  }
}

export default AppError;
