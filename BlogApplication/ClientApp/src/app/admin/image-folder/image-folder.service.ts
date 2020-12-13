import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from './../../services/controller.service';
import { Injectable } from '@angular/core';
import { DataTable, ImageAndFolder } from 'src/app/models';

@Injectable()
export class ImageService extends ControllerService {
  constructor(http: HttpClient) {
    super('Images', http);
  }

  getFolders(dataTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', dataTable.filter);
    httpParams = httpParams.append('orderby', dataTable.orderBy);
    httpParams = httpParams.append('pageSize', dataTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', dataTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveImageFolder(imageFolder: ImageAndFolder) {
    return this.post('/saveFolder', imageFolder)
  }

  updateImageFolder(imageFolder: ImageAndFolder) {
    return this.put(`/${imageFolder.id}/updateFolder`, imageFolder);
  }

  removeImageFolder(id: string) {
    return this.delete(`/${id}/removeFolder`);
  }
}

