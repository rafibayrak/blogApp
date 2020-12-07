import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../models';

@Pipe({
  name: 'userRolesPipe'
})

export class UserRolePipe implements PipeTransform {
  transform(value: number): any {
    switch (value) {
      case UserRole.Administrator:
        return 'Administrator';
        break;
      case UserRole.Editor:
        return 'Editor';
        break;
      case UserRole.User:
        return 'User';
        break;
    }
  }
}
