interface SuccessResponseArgs {
  message?: string;
  data: any;
}

export class SuccessResponse {
  public readonly message?: string | undefined;
  public readonly data: any;

  constructor(args: SuccessResponseArgs) {
    if (args.message) {
      this.message = args.message;
    }

    this.data = args.data;
  }
}
