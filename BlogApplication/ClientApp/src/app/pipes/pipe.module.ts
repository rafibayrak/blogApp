import { NgModule } from '@angular/core';
import { UserRolePipe } from './user.roles.pipe';


@NgModule({
  declarations: [
    UserRolePipe
  ],
  exports: [
    UserRolePipe
  ]
})
export class PipeModule { }
