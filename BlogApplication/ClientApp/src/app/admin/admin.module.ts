import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
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
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './users/users.component';
import { PipeModule } from '../pipes/pipe.module';
import { PostDialogComponent } from './blog/post-dialog/post-dialog.component';
import { BlogPostService } from './blog/blog.service';
import { MatChipsModule } from '@angular/material/chips';
import { AlertDialogComponent } from './AlertDialog/AlertDialog.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ImageFolderComponent } from './image-folder/image-folder.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageService } from './image-folder/image-folder.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageFolderDialogComponent } from './image-folder/image-folder-dialog/image-folder-dialog.component';
import { ImagePageComponent } from './image-page/image-page.component';
import { ImageUploadDialogComponent } from './image-page/image-upload-dialog/image-upload-dialog.component';
import { ImagePageService } from './image-page/image-page.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AdminComponent,
    CategoryComponent,
    AdminDashboardComponent,
    BlogComponent,
    CategoryDialogComponent,
    UserDialogComponent,
    UsersComponent,
    PostDialogComponent,
    AlertDialogComponent,
    ImageFolderComponent,
    ImageFolderDialogComponent,
    ImagePageComponent,
    ImageUploadDialogComponent
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
    MatChipsModule,
    CKEditorModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    ClipboardModule
  ],
  providers: [
    CategoryService,
    UserService,
    BlogPostService,
    ImageService,
    ImagePageService
  ]
})
export class AdminModule { }
