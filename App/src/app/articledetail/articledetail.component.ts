import { Component, OnInit , Input} from '@angular/core';
import {Article} from "../model/article";
import {ArticleService} from "../services/article.service";
import {Comment} from "../model/comment";
import {CommentService} from "../services/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/users";
import {AuthService} from "../services/auth.service";
import {NbWindowService} from "@nebular/theme";

@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.scss']
})
export class ArticledetailComponent implements OnInit {

  @Input() article: Article;
  @Input() comment: Comment;
  currentUser: User;
  commentlist:Array<Comment>;
  value = '';
  author: string;
  content: string;
  description: string;
  constructor(public authService: AuthService,
              private actRoute: ActivatedRoute,
              private windowService: NbWindowService,
              private as: ArticleService,
              private cs: CommentService) {
    let id = localStorage.getItem("currid");
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
    });
  }

  ngOnInit(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getArticle(id);
    // @ts-ignore
    this.getComment(id).toPromise().then(commentlist=>{this.commentlist=commentlist;console.log(this.commentlist)});
  }
  getArticle(id){
    this.as.getone(id).subscribe( article =>{
      this.article = article;
    });
  }
  getComment(id){
    this.cs.getArtiComment(id).subscribe(comment =>{
      this.comment = comment;
    });
  }



}
