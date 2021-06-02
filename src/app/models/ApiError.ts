import {ErrorStatusCode} from '../enums/error-status-code';

export class ApiError {
  errorStatusCode: ErrorStatusCode;
  message: string;
  timeStamp: string;
}
