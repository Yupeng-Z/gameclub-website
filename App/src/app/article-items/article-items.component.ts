import { Component, OnInit } from '@angular/core';
import {Article} from '../model/article';
import {ArticleService} from '../services/article.service';

@Component({
  selector: 'app-article-items',
  templateUrl: './article-items.component.html',
  styleUrls: ['./article-items.component.scss']
})
export class ArticleItemsComponent implements OnInit {
  articles: Article[];
  constructor(private as: ArticleService) { }

  ngOnInit() {
    this.as.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}


