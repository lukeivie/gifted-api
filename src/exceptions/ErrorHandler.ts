import { Response } from "express";
import { ApiError } from "./ApiError";
import { HttpCode, ErrorResponse, ErrorType } from "@types";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof ApiError) {
      return error.isOperational;
    }

    return false;
  }

  private isPrismaError(
    error: Error | ApiError | PrismaClientKnownRequestError | PrismaClientValidationError
  ): boolean {
    if (error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientValidationError) {
      return true;
    }

    return false;
  }

  public handleError(
    error: Error | ApiError | PrismaClientKnownRequestError | PrismaClientValidationError,
    response?: Response
  ): void {
    if (this.isTrustedError(error) && response) {
      if (this.isPrismaError(error)) {
        this.handlePrismaError(error, response);
      } else {
        this.handleTrustedError(error as ApiError, response);
      }
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: ApiError, response: Response): void {
    response.status(error.httpCode).json(
      new ErrorResponse({
        message: error.message,
      })
    );
  }

  private handlePrismaError(
    error: Error | ApiError | PrismaClientKnownRequestError | PrismaClientValidationError,
    response: Response
  ) {
    if (error instanceof PrismaClientKnownRequestError) {
      response.status(HttpCode.BAD_REQUEST).json(
        new ErrorResponse({
          type: ErrorType.PRISMA,
          message: error.message,
          meta: {
            code: error.code,
          },
        })
      );
    } else if (error instanceof PrismaClientKnownRequestError) {
      response.status(HttpCode.BAD_REQUEST).json(
        new ErrorResponse({
          type: ErrorType.PRISMA,
          message: error.message,
        })
      );
    }
  }

  private handleCriticalError(error: Error | ApiError, response?: Response): void {
    if (response) {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json(new ErrorResponse({ message: "Internal server error" }));
    }

    console.log("Application encountered a critical error. Exiting");
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
