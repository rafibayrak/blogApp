import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { ImageService } from './image-folder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertDialog, DataTable, ImageAndFolder } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ImageFolderDialogComponent } from './image-folder-dialog/image-folder-dialog.component';
import { AlertDialogComponent } from '../AlertDialog/AlertDialog.component';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrls: ['./image-folder.component.scss']
})
export class ImageFolderComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();
  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: false }) matMenuTrigger: MatMenuTrigger;
  folders = new Array();

  constructor(
    private _imageService: ImageService,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getFolders':
        this.folders = this.getResponseData().source;
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'CRUDImageFolder':
        this.getServerData();
        break;
    }
  }

  responseError(whoseRequest: any) {
    throw new Error('Method not implemented.');
  }

  getServerData() {
    this.serverRequest(this._imageService.getFolders(this.dataTable), 'getFolders');
  }

  onCreateFolder() {
    const dialogRef = this._dialog.open(ImageFolderDialogComponent, {
      panelClass: 'col-md-6'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serverRequest(this._imageService.saveImageFolder(result), 'CRUDImageFolder');
      }
    });
  }

  /**
   * Method called when the user click with the right button
   * @param event MouseEvent, it contains the coordinates
   * @param item Our data contained in the row of the table
   */
  onRightClick(event: MouseEvent, id) {
    if (!id) {
      return;
    }

    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = { item: id };
    this.matMenuTrigger.openMenu();
  }

  onEditFolder(id: string) {
    const imageFolder = this.folders.find(x => x.id === id);
    if (imageFolder) {
      const dialogRef = this._dialog.open(ImageFolderDialogComponent, {
        panelClass: 'col-md-6',
        data: imageFolder
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._imageService.updateImageFolder(result), 'CRUDImageFolder');
        }
      });
    }
  }

  onDeleteFolder(id: string) {
    const imageFolder = this.folders.find(x => x.id === id);
    if (imageFolder) {
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
          this.serverRequest(this._imageService.removeImageFolder(id), 'CRUDImageFolder');
        }
      });
    }
  }
}
