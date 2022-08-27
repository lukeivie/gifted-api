import { SuccessResponse } from "@types";

function success(data: any) {
  return new SuccessResponse({
    data: data,
  });
}

export default success;
