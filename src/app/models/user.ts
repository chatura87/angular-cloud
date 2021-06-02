import {RecStatus} from '../enums/rec-status';
import {Language} from '../enums/language';
import {UserType} from '../enums/user-type';

export class User {
  id: number;
  login: string;
  password: string;
  role: number;
  fullName: string;
  recStatus: RecStatus;
  language: Language;
  organizationId: number;
  passwordExpiry: Date;
  mobilePhone: string;
  timestampC: Date;
  timestampU: Date;
  type: UserType;
}
