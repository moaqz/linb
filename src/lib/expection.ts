export class AuthRequiredError extends Error {
  constructor(message = "Auth is required to access this resource") {
    super(message);

    this.name = "AuthRequiredError";
  }
}

export class ValidationError extends Error {
  constructor(errorMsg: string) {
    super(errorMsg);

    this.stack = undefined;
    this.name = "ValidationError";
  }
}
