import { UserRole } from '.';

export class User {
  id: string;
  creationTime: Date;
  modificationTime: Date;
  userRole: UserRole;
  userName: string;
  name: string;
  email: string;
}
