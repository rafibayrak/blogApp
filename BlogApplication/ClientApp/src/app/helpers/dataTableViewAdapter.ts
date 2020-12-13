import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { DataTable } from '../models/dataTable';

export abstract class DataTableViewAdapter {
  abstract dataTable: DataTable;
  abstract responseResult(whoseRequest);
  abstract responseError(whoseRequest);
  abstract getServerData();

  private _data: any;
  private _error: any;
  constructor() {

  }

  serverRequest(request: Observable<any>, whoseRequest?) {
    request.subscribe(result => {
      this._data = result;
      this.responseResult(whoseRequest);
    }, error => {
      this._error = error;
      this.responseError(whoseRequest);
    })
  }

  getResponseData() {
    return this._data;
  }

  getResponseError() {
    return this._error;
  }

  applyFilter(dataTable: DataTable) {
    this.getServerData();
  }

  sortData(sort: Sort, dataTable: DataTable) {
    if (sort.direction === 'asc') {
      dataTable.orderBy = `-${sort.active}`;
    } else if (sort.direction === 'desc') {
      dataTable.orderBy = `${sort.active}`;
    } else {
      dataTable.orderBy = '';
    }

    this.getServerData();
  }

  paginatorChange(event: PageEvent, dataTable: DataTable) {
    dataTable.pageIndex = event.pageIndex;
    dataTable.pageSize = event.pageSize;
    this.getServerData();
  }
}
