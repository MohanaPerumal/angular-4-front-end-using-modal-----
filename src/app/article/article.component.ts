import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';
import { Article } from './article';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  

  //Component properties
  allArticles: Article[];
  // type array1 =Array<title:string,category:string>;

  statusCode: number;
  requestProcessing = false;
  // articleIdToUpdate = null;
  processValidation = false;
  //Create form
  articleForm = new FormGroup({
    id: new FormControl('', Validators.required)
    //  title: new FormControl('', Validators.required),
    //  category: new FormControl('', Validators.required)	   
  });
  articleForm1 = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit() {

    this.getAllArticles();
  }
  //Fetch all articles
  getAllArticles() {
    this.articleService.getAllArticles()
      .subscribe(
      data => this.allArticles = data,
      errorCode => this.statusCode = errorCode);
  }
  //Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.preProcessConfigurations();
    let id = this.articleForm.get('id').value.trim();
    let title = this.articleForm1.get('title').value.trim();
    let category = this.articleForm1.get('category').value.trim();
  	 
    let article = new Article(id, title, category);
    this.articleService.createArticle(article)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllArticles();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);
  }

  articleToUpdate() {
    
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.preProcessConfigurations();
    
    let id = this.articleForm.get('id').value;
    let title = this.articleForm1.get('title').value;
    let category = this.articleForm1.get('category').value;


    //Handle update article
    let article = new Article(id, title, category);
  
    this.articleService.updateArticle(article)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllArticles();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);
  }

  //Load article by id to edit
  loadArticleToEdit(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.getArticleById(articleId)
      .subscribe(article => {
        this.articleForm.setValue({ id: article.articleId});
       this.articleForm1.setValue({ title: article.title, category: article.category});
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }
  //Delete article
  deleteArticle(articleId: string) {
    this.preProcessConfigurations();
    this.articleService.deleteArticleById(articleId)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllArticles();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  //Go back from update to create
  backToCreateArticle() {
    this.articleForm.reset();
    this.articleForm1.reset();
  }
}


