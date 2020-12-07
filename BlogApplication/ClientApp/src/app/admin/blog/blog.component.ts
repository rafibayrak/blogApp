import { BlogPostService } from './blog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataTableViewAdapter } from 'src/app/helpers/DataTableViewAdapter';
import { DataTable } from 'src/app/models';
import { PostDialogComponent } from './post-dialog/post-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends DataTableViewAdapter implements OnInit {
  dataTable = new DataTable();

  constructor(
    private _blogPostService: BlogPostService,
    private _dialog: MatDialog
  ) {
    super();
    this.dataTable.displayedColumns = ['creationTime', 'modificationTime', 'title', 'content', 'categoryNames'];
  }

  ngOnInit(): void {
    this.getServerData();
  }

  responseResult(whoseRequest: any) {
    switch (whoseRequest) {
      case 'getBlogPosts':
        this.dataTable.lenght = this.getResponseData().filterRows;
        this.dataTable.dataSource = this.getResponseData().source;
        break;
      case 'createBlogPost':
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
      panelClass: 'col-md-6'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.serverRequest(this._blogPostService.saveBlogPost(result), 'createBlogPost');
    });
  }
}
