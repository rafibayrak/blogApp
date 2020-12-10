import { AlertDialog } from './../../models/';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AlertDialog',
  templateUrl: './AlertDialog.component.html',
  styleUrls: ['./AlertDialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  alertDialog = new AlertDialog();
  constructor(
    private _dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.alertDialog = _data;
  }

  ngOnInit() {
  }

  onClick() {
    this._dialogRef.close(true);
  }

  onClose() {
    this._dialogRef.close();
  }
}
