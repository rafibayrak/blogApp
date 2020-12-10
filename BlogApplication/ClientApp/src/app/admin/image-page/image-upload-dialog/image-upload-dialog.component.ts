import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent implements OnInit {
  files = new Array<File>();
  folderId: string;
  constructor(
    private _dialogRef: MatDialogRef<ImageUploadDialogComponent>,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _toastr: ToastrService
  ) {
    if (_data) {
      this.folderId = _data;
    }
  }

  ngOnInit(): void {
  }

  onClick() {
    if (this.files.length > 0) {
      const formData = new FormData();
      for (const file of this.files) {
        formData.append(file.name, file);
      }

      formData.append('folderId', this.folderId);
      const token = localStorage.getItem('authToken');
      let header = new HttpHeaders();
      if (token) {
        header = header.set('Authorization', 'Bearer ' + token);
      }

      this.httpClient.post('/api/Images/uploadImage', formData, { headers: header }).subscribe(result => {
        this._dialogRef.close(true);
      }, error => {
        this._toastr.error('Yükleme gerçekleşirken hata oluştu', 'Yükleme Hatası');
      });
    }
  }

  onClose() {
    this._dialogRef.close();
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }
}
