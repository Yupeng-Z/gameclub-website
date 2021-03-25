import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {User} from '../model/users';

import { ArticleService } from '../services/article.service'
import {Article} from '../model/article';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class homepageComponent implements OnInit {

  currentUser: User;

  articlelist:Array<Article>;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private as: ArticleService,
    private route: Router
  ) {
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //window.localStorage.setItem("currid", id);
    let id = localStorage.getItem("currid");
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
      
    })
    this.as.list().toPromise().then(articlelist=>{this.articlelist=articlelist;console.log(this.articlelist)});
  }

  ngOnInit() { console.log(this.currentUser)}

  logout() {
    this.authService.doLogout()
  }

  detail(article){
    this.route.navigate([`/detail/${article}`]),{
      queryParams: {
        id: article
      }
    }
  }
}


