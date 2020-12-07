import { Category } from './../../../models/';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  category = new Category();
  categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private _dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.category.name = this.categoryForm.get('name').value;
    if (this.category.name) {
      this._dialogRef.close(this.category);
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}