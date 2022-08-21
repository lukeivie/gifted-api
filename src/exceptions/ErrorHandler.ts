import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";
import { ApiError, HttpCode } from "./ApiError";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof ApiError) {
      return error.isOperational;
    }

    return false;
  }

  // private isPrismaError(error: PrismaClientKnownRequestError): boolean {

  //   const normalized = new ApiError();
  //   normalized.name = error?.code;
  //   normalized.httpCode =

  //   return false;
  // }

  public handleError(error: Error | ApiError | PrismaClientKnownRequestError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as ApiError, response);
    } else {
      this.handleCriticalError(error, response);
    }

    // else if (this.isPrismaError(error) && response) {
    //   this.handlePrismaError(error as PrismaClientKnownRequestError, response);
    // }
  }

  // private handlePrismaError(error: PrismaClientKnownRequestError, response: Response): void {
  //   response.status(error.httpCode).json({ message: error.message });
  // }

  private handleTrustedError(error: ApiError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }

  private handleCriticalError(error: Error | ApiError, response?: Response): void {
    if (response) {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }

    console.log("Application encountered a critical error. Exiting");
    process.exit(1);
  }
}

export default new ErrorHandler();
