import { UserService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { DataTable } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();

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
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'createUser':
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
      this.serverRequest(this._userService.saveUser(result), 'createUser');
    });
  }
}
