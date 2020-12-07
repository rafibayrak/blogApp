import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { DataTable } from 'src/app/models/dataTable';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();

  constructor(
    private _categoryService: CategoryService,
    private _dialog: MatDialog
  ) {
    super();
    this.dataTable.displayedColumns = ['name', 'operation'];
  }

  ngOnInit() {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getCategories':
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'createCategory':
        this.getServerData();
        break;
    }
  }
  responseError(whoseRequest: any) {
    throw new Error('Method not implemented.');
  }

  getServerData() {
    this.serverRequest(this._categoryService.getAllCategories(this.dataTable), 'getCategories');
  }

  onCreateCategory() {
    const dialogRef = this._dialog.open(CategoryDialogComponent, {
      panelClass: 'col-md-6'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serverRequest(this._categoryService.saveCategory(result), 'createCategory');
    });
  }
}
