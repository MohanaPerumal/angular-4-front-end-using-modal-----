import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { ArticleComponent }  from './article/article.component';
import { ArticleService } from './article/article.service';

@NgModule({
  imports: [     
        BrowserModule,
	HttpModule,
	ReactiveFormsModule,
      NgbModule
  ],
  declarations: [
        AppComponent,
	ArticleComponent
  ],
  providers: [
        ArticleService
  ],
  bootstrap: [
        AppComponent,
        ArticleComponent
  ]
})
export class AppModule { }