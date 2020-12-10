import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertDialog, DataTable, ImageAndFolder } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ImagePageService } from './image-page.service';
import { ImageUploadDialogComponent } from './image-upload-dialog/image-upload-dialog.component';
import { AlertDialogComponent } from '../AlertDialog/AlertDialog.component';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss']
})
export class ImagePageComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();
  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: false }) matMenuTrigger: MatMenuTrigger;
  images = new Array<ImageAndFolder>();
  folderId: string;
  constructor(
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _imageService: ImagePageService,
    private _clipboard: Clipboard
  ) {
    super();
    this.folderId = _route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getAllFolderImages':
        this.images = this.getResponseData().source;
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'CRUDImage':
        this.getServerData();
        break;
    }
  }

  responseError(whoseRequest: any) {
    throw new Error('Method not implemented.');
  }

  getServerData() {
    this.serverRequest(this._imageService.getAllFolderImages(this.folderId, this.dataTable), 'getAllFolderImages');
  }

  onCreateImage() {
    const dialogRef = this._dialog.open(ImageUploadDialogComponent, {
      panelClass: 'col-md-6',
      data: this.folderId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getServerData();
      }
    });
  }

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

  onDeleteFolder(id: string) {
    const image = this.images.find(x => x.id === id);
    if (image) {
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
          this.serverRequest(this._imageService.removeImage(id), 'CRUDImage');
        }
      });
    }
  }

  onCopyUrl(id: string) {
    const image = this.images.find(x => x.id === id);
    this._clipboard.copy(`${window.location.origin}/App_Data/${this.folderId}/${image.name}`);
  }
}
