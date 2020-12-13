import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from './../../services/controller.service';
import { Injectable } from '@angular/core';
import { DataTable } from 'src/app/models';

@Injectable()
export class ImagePageService extends ControllerService {
  private _httpClient: HttpClient;
  constructor(
    http: HttpClient
  ) {
    super('Images', http);
    this._httpClient = http;
  }

  getAllFolderImages(folderId: string, dataTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', dataTable.filter);
    httpParams = httpParams.append('orderby', dataTable.orderBy);
    httpParams = httpParams.append('pageSize', dataTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', dataTable.pageIndex.toString());
    return this.get(`/${folderId}/images`, httpParams);
  }

  removeImage(id: string) {
    return this.delete(`/${id}/removeImage`);
  }
}
