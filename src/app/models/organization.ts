import {OrganizationType} from '../enums/organization-type';

export class Organization {
  id: number;
  code: string;
  fullName: string;
  type: OrganizationType;
  recStatus?: string;
}
