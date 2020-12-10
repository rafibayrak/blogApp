import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageAndFolder } from 'src/app/models';

@Component({
  selector: 'app-image-folder-dialog',
  templateUrl: './image-folder-dialog.component.html',
  styleUrls: ['./image-folder-dialog.component.scss']
})
export class ImageFolderDialogComponent implements OnInit {
  imageFolder = new ImageAndFolder();
  imageFolderForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private _dialogRef: MatDialogRef<ImageFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    if (_data) {
      this.imageFolder = _data;
      this.imageFolderForm.get('name').setValue(this.imageFolder.name);
    }
   }

  ngOnInit(): void {
  }

  onClick() {
    this.imageFolder.name = this.imageFolderForm.get('name').value;
    if (this.imageFolder.name) {
      this._dialogRef.close(this.imageFolder);
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}
