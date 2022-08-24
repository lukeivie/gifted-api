import { ApiErrorType } from "@types";

interface ApiErrorArgs {
  type?: ApiErrorType;
  message: string;
  meta?: any;
}

export class ApiErrorResponse {
  public readonly type: ApiErrorType | undefined;
  public readonly message: string;
  public readonly meta: any;

  constructor(args: ApiErrorArgs) {
    if (args.type) {
      this.type = args.type || ApiErrorType.DEFAULT;
    }
    this.message = args.message;

    if (args.meta) {
      this.meta = args.meta || null;
    }
  }
}
