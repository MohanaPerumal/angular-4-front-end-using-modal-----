import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent }  from './article.component';
import { ArticleService } from './article.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [     
        BrowserModule,
	  HttpModule,
       NgbModule,
      BsDropdownModule,
      TooltipModule,
      ModalModule,
	ReactiveFormsModule
  ],
  declarations: [
	ArticleComponent
  ],
  providers: [
        ArticleService
  ],
  bootstrap: [
        ArticleComponent
  ]
})
export class ArticleModule { }