import { Category } from './../../models/';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from './../../services/controller.service';
import { Injectable } from '@angular/core';
import { DataTable } from 'src/app/models/dataTable';

@Injectable()
export class CategoryService extends ControllerService {
  constructor(http: HttpClient) {
    super('Categories', http);
  }

  getAll() {
    return this.get('/notFilter', null);
  }

  getAllCategories(datatTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', datatTable.filter);
    httpParams = httpParams.append('orderby', datatTable.orderBy);
    httpParams = httpParams.append('pageSize', datatTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', datatTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveCategory(category: Category) {
    return this.post('', category, null);
  }

  updateCategory(category: Category) {
    return this.put(`/${category.id}`, category);
  }

  removeCategory(categoryId: string) {
    return this.delete(`/${categoryId}`);
  }
}
