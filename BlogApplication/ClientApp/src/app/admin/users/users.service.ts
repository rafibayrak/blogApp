import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from '../../services/controller.service';
import { Injectable } from '@angular/core';
import { DataTable, User } from 'src/app/models';
import { UserCreate } from 'src/app/models/';

@Injectable()
export class UserService extends ControllerService {
  constructor(
    httpClient: HttpClient
  ) {
    super('Users', httpClient);
  }

  getAll(dataTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', dataTable.filter);
    httpParams = httpParams.append('orderby', dataTable.orderBy);
    httpParams = httpParams.append('pageSize', dataTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', dataTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveUser(user: UserCreate) {
    return this.post('', user, null);
  }

  updateUser(user: User) {
    return this.put(`/${user.id}`, user);
  }

  removeUser(userId: string) {
    return this.delete(`/${userId}`);
  }
}
