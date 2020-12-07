import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserCreate, UserRole } from 'src/app/models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user = new UserCreate();
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    userRole: new FormControl('', Validators.required)
  });

  constructor(
    private _dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.user.name = this.userForm.get('name').value;
    this.user.password = this.userForm.get('password').value;
    this.user.userName = this.userForm.get('userName').value;
    this.user.email = this.userForm.get('email').value;
    this.user.userRole = this.userForm.get('userRole').value;
    if (this.user.name) {
      this._dialogRef.close(this.user);
    }
  }

  onClose() {
    this._dialogRef.close();
  }

  getUserRoles() {
    const enums = Object.keys(UserRole).filter(x => (parseInt(x) > 0)).map(Number);
    return enums;
  }
}
