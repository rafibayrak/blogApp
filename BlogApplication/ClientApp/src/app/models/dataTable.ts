import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  template: ''
})
// tslint:disable-next-line: component-class-suffix
export class DataTable {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter: string = '';
  orderBy: string = '';
  lenght: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;
}
