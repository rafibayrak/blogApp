import { NgModule } from '@angular/core';
import { MomentPipe } from './moments.pipe';
import { UserRolePipe } from './user.roles.pipe';


@NgModule({
  declarations: [
    UserRolePipe,
    MomentPipe
  ],
  exports: [
    UserRolePipe,
    MomentPipe
  ]
})
export class PipeModule { }
