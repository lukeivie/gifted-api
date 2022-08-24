import { Response } from "express";
import { ApiError } from "./ApiError";
import { HttpCode, ApiErrorType } from "@types";
import { ApiErrorResponse } from "./ApiErrorResponse";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof ApiError) {
      return error.isOperational;
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return true;
    }

    return false;
  }

  public handleError(error: Error | ApiError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as ApiError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: ApiError | PrismaClientKnownRequestError, response: Response): void {
    if (error instanceof PrismaClientKnownRequestError) {
      response.status(HttpCode.BAD_REQUEST).json(
        new ApiErrorResponse({
          type: ApiErrorType.PRISMA,
          message: error.message,
          meta: {
            code: error.code,
          },
        })
      );
    } else {
      response.status(error.httpCode).json(
        new ApiErrorResponse({
          message: error.message,
        })
      );
    }
  }

  private handleCriticalError(error: Error | ApiError, response?: Response): void {
    if (response) {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json(new ApiErrorResponse({ message: "Internal server error" }));
    }

    console.log("Application encountered a critical error. Exiting");
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
