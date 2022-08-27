import { ErrorType } from "@types";

interface ApiErrorArgs {
  type?: ErrorType;
  message: string;
  meta?: any;
}

export class ErrorResponse {
  public readonly type: ErrorType | undefined;
  public readonly message: string;
  public readonly meta: any;

  constructor(args: ApiErrorArgs) {
    if (args.type) {
      this.type = args.type || ErrorType.DEFAULT;
    }
    this.message = args.message;

    if (args.meta) {
      this.meta = args.meta || null;
    }
  }
}
