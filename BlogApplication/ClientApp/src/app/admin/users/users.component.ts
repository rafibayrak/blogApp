import { UserService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { AlertDialog, DataTable, User } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AlertDialogComponent } from '../AlertDialog/AlertDialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();
  users = new Array<User>();

  constructor(
    private _userService: UserService,
    private _dialog: MatDialog
  ) {
    super();
    this.dataTable.displayedColumns = ['creationTime', 'modificationTime', 'name', 'email', 'operation'];
  }

  ngOnInit() {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getAll':
        this.users = this.getResponseData().source;
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'CRUDUser':
        this.getServerData();
        break;
    }
  }

  responseError(whoseRequest: any) {
    throw new Error('Method not implemented.');
  }

  getServerData() {
    this.serverRequest(this._userService.getAll(this.dataTable), 'getAll');
  }

  onCreateUser() {
    const dialogRef = this._dialog.open(UserDialogComponent, {
      panelClass: 'col-md-6'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serverRequest(this._userService.saveUser(result), 'CRUDUser');
      }
    });
  }

  onEditUser(id: string) {
    const user = this.users.find(x => x.id === id);
    if (user) {
      const dialogRef = this._dialog.open(UserDialogComponent, {
        panelClass: 'col-md-6',
        data: user
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._userService.updateUser(result), 'CRUDUser');
        }
      });
    }
  }

  onRemoveUser(id: string) {
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
        this.serverRequest(this._userService.removeUser(id), 'CRUDUser');
      }
    });
  }
}
