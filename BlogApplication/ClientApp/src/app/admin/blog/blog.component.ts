import { BlogPostService } from './blog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { AlertDialog, BlogPost, DataTable } from 'src/app/models';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { AlertDialogComponent } from '../AlertDialog/AlertDialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();
  blogPosts = new Array<BlogPost>();
  constructor(
    private _blogPostService: BlogPostService,
    private _dialog: MatDialog
  ) {
    super();
    this.dataTable.displayedColumns = ['creationTime', 'modificationTime', 'title', 'content', 'categoryNames', 'operation'];
  }

  ngOnInit(): void {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getBlogPosts':
        this.blogPosts = this.getResponseData().source;
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'CRUDBlogPost':
        this.getServerData();
        break;
    }
  }

  responseError(whoseRequest: any) {
    throw new Error('Method not implemented.');
  }

  getServerData() {
    this.serverRequest(this._blogPostService.getAllBlogPosts(this.dataTable), 'getBlogPosts');
  }

  onCreateBlogPost() {
    const dialogRef = this._dialog.open(PostDialogComponent, {
      panelClass: 'col-md-12'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serverRequest(this._blogPostService.saveBlogPost(result), 'CRUDBlogPost');
      }
    });
  }

  onEditPost(id: string) {
    const blogPost = this.blogPosts.find(x => x.id === id);
    if (blogPost) {
      const dialogRef = this._dialog.open(PostDialogComponent, {
        panelClass: 'col-md-12',
        data: blogPost
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._blogPostService.updateBlogPost(result), 'CRUDBlogPost');
        }
      });
    }
  }

  onRemovePost(id: string) {
    const blogpost = this.blogPosts.find(x => x.id === id);
    if (blogpost) {
      const alertDialog = new AlertDialog();
      alertDialog.title = 'Silme';
      alertDialog.content = 'Silmek istediğinize emin misiniz?';
      alertDialog.isShowOkButton = true;
      const dialogRef = this._dialog.open(AlertDialogComponent, {
        panelClass: 'col-md-6',
        data: alertDialog
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serverRequest(this._blogPostService.removeBlogPost(blogpost), 'CRUDBlogPost');
        }
      });
    }
  }

  contentSummary(content: string) {
    return `${content.substring(0, 75)}...`;
  }
}
