import { CategoryService } from './../../category/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { BlogPostCreate, Category } from 'src/app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
  categories = new Array<Category>();
  blogPostCreate = new BlogPostCreate();
  selectedCategories = new Array<Category>();
  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  constructor(
    private _dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _categoryService: CategoryService
  ) {
    _categoryService.getAll().subscribe(result => {
      this.categories = result;
    }, error => {
    });
  }

  ngOnInit(): void {
  }

  onClick() {
    this.blogPostCreate.categoryIds = this.selectedCategories.map(x => x.id);
    this.blogPostCreate.title = this.postForm.get('title').value;
    this.blogPostCreate.content = this.postForm.get('content').value;
    if (this.blogPostCreate.categoryIds.length !== 0 && this.blogPostCreate.title && this.blogPostCreate.content) {
      this._dialogRef.close(this.blogPostCreate);
    }
  }

  onClose() {
    this._dialogRef.close();
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  add(value): void {
    const notExist = !this.selectedCategories?.find(x => x.id === value?.id);
    if (value && notExist) {
      this.selectedCategories.push(value);
    }
  }

  remove(category: Category): void {
    const index = this.selectedCategories.indexOf(category);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }
}
