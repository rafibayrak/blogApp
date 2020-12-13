import { AlertDialogComponent } from './../AlertDialog/AlertDialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { AlertDialog, Category } from 'src/app/models';
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
  categories = new Array<Category>();

  constructor(
    private _categoryService: CategoryService,
    private _dialog: MatDialog
  ) {
    super();
    this.dataTable.displayedColumns = ['creationTime', 'modificationTime', 'name', 'operation'];
  }

  ngOnInit() {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getCategories':
        this.categories = this.getResponseData().source;
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'CRUDCategory':
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
      if (result) {
        this.serverRequest(this._categoryService.saveCategory(result), 'CRUDCategory');
      }
    });
  }

  onEditCategory(id: string) {
    const category = this.categories.find(x => x.id === id);
    if (category) {
      const dialogRef = this._dialog.open(CategoryDialogComponent, {
        panelClass: 'col-md-6',
        data: category
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._categoryService.updateCategory(result), 'CRUDCategory');
        }
      });
    }
  }

  onRemoveCategory(id: string) {
    const category = this.categories.find(x => x.id === id);
    if (category) {
      const alertDialog = new AlertDialog();
      alertDialog.title = 'Silme';
      alertDialog.content = 'Silmek istediğinize emin misiniz?';
      alertDialog.isShowOkButton = true;
      const dialogRef = this._dialog.open(AlertDialogComponent, {
        panelClass: 'col-md-6',
        data: alertDialog
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._categoryService.removeCategory(id), 'CRUDCategory');
        }
      });
    }
  }
}
