import { UserRole } from '.';

export class UserCreate {
  id: string;
  creationTime: Date;
  modificationTime: Date;
  userRole: UserRole;
  userName: string;
  password: string;
  name: string;
  email: string;
  token: string;
}
