import StatusCode from "./status-code";

export default class ErrorException extends Error {
  public status: number;
  public message: string;

  constructor(code = StatusCode.UnknownError, message = "Internal Server Error") {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = code;
    this.message = message;
  }
}
