import { HttpClient, HttpParams } from '@angular/common/http';
import { ControllerService } from './../../services/controller.service';
import { Injectable } from '@angular/core';
import { BlogPost, BlogPostCreate, DataTable } from 'src/app/models';

@Injectable()
export class BlogPostService extends ControllerService {
  constructor(
    http: HttpClient
  ) {
    super('BlogPosts', http);
  }

  getBlogPostWithCategories(id: string) {
    return this.get(`/${id}/categories`);
  }

  getAllBlogPosts(dataTable: DataTable) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('filter', dataTable.filter);
    httpParams = httpParams.append('orderby', dataTable.orderBy);
    httpParams = httpParams.append('pageSize', dataTable.pageSize.toString());
    httpParams = httpParams.append('pageIndex', dataTable.pageIndex.toString());
    return this.get('', httpParams);
  }

  saveBlogPost(blogPost: BlogPostCreate) {
    return this.post('', blogPost);
  }

  updateBlogPost(blogPost: BlogPostCreate) {
    return this.put(`/${blogPost.id}`, blogPost);
  }

  removeBlogPost(blogPost: BlogPost) {
    return this.delete(`/${blogPost.id}`);
  }
}
