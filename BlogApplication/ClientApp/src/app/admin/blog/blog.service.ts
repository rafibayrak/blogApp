import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from './../../services/controller.service';
import { Injectable } from '@angular/core';
import { BlogPostCreate, DataTable } from 'src/app/models';

@Injectable()
export class BlogPostService extends ControllerService {
  constructor(
    http: HttpClient
  ) {
    super('BlogPosts', http);
  }

  getAllBlogPosts(datatTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', datatTable.filter);
    httpParams = httpParams.append('orderby', datatTable.orderBy);
    httpParams = httpParams.append('pageSize', datatTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', datatTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveBlogPost(blogPost: BlogPostCreate) {
    return this.post('', blogPost);
  }
}
