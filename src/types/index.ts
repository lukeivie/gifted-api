export enum HttpCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorType {
  PRISMA = "PrismaError",
  DEFAULT = "ApiError",
}

export { ErrorResponse } from "./ErrorResponse";
export { SuccessResponse } from "./SuccessResponse";
