import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from '../../services/controller.service';
import { Injectable } from '@angular/core';
import { DataTable } from 'src/app/models';
import { UserCreate } from 'src/app/models/';

@Injectable()
export class UserService extends ControllerService {
  constructor(
    httpClient: HttpClient
  ) {
    super('Users', httpClient);
  }

  getAll(datatTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', datatTable.filter);
    httpParams = httpParams.append('orderby', datatTable.orderBy);
    httpParams = httpParams.append('pageSize', datatTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', datatTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveUser(user: UserCreate) {
    return this.post('', user, null);
  }
}
