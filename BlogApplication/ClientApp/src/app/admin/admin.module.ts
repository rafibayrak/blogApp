import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { CategoryComponent } from './category/category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryService } from './category/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from './users/users.service';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { UsersComponent } from './users/users.component';
import { PipeModule } from '../pipes/pipe.module';
import { PostDialogComponent } from './blog/post-dialog/post-dialog.component';
import { BlogPostService } from './blog/blog.service';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AdminComponent,
    CategoryComponent,
    AdminDashboardComponent,
    BlogComponent,
    CategoryDialogComponent,
    UserDialogComponent,
    UsersComponent,
    PostDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    PipeModule,
    MatChipsModule
  ],
  providers: [
    CategoryService,
    UserService,
    BlogPostService
  ]
})
export class AdminModule { }
