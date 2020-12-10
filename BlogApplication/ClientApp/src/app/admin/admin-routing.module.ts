import { ImageFolderComponent } from './image-folder/image-folder.component';
import { UsersComponent } from './users/users.component';
import { BlogComponent } from './blog/blog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ImagePageComponent } from './image-page/image-page.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: '', component: AdminDashboardComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'user', component: UsersComponent },
    { path: 'imageFolders', component: ImageFolderComponent },
    { path: 'images/:id', component: ImagePageComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
