import { ErrorResponse, ErrorType } from "@types";

function notFound(entityName: string) {
  return new ErrorResponse({
    type: ErrorType.DEFAULT,
    message: `${entityName} not found`,
  });
}

export default notFound;
