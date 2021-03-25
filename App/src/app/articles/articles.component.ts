import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service'

import {User} from '../model/users';
import {Article} from '../model/article';

import { NbWindowService } from '@nebular/theme';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl:'./upload.html',
})
export class UploadArticleContent {
  @Input() name;
  constructor() {}
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input() article: Article;
  @Output() deleteArticle: EventEmitter<Article> = new EventEmitter();
  currentUser: User;
  value = '';

  articlelist:Array<Article>;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private windowService: NbWindowService,
    private as: ArticleService,
    private route: Router
  ) {
    // actRoute.queryParams.subscribe(queryParams => {
    //   this.id = queryParams.id;
    // });
    //let id = this.actRoute.snapshot.paramMap.get('id');
    let id = localStorage.getItem("currid");
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
    });


  }

  ngOnInit() {
    this.as.list().toPromise().then(articlelist=>{this.articlelist=articlelist;console.log(this.articlelist)});
  }



  open() {
    // const modalRef = this.modalService.open(UploadContent);
    // modalRef.componentInstance.name = 'World';
    this.windowService.open(UploadArticleContent, { title: `Upload Articles`,});
  }
  detail(article){
    this.route.navigate([`/detail/${article}`]),{
      queryParams: {
        id: article
      }
    }
  }
}
