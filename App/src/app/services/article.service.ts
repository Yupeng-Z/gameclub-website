import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {User} from '../model/users';
import { Form } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  //private serverUrl = environment.serverBaseURL;
  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  public uploadpic(form:FormData,id:string){
    return this.http.post(`${this.endpoint}/article/uploadpic/${id}`, form).toPromise()
  }
  public list(): Observable<Array<Article>> {

    const Articles$ = this.http.get<Article[]>(`${this.endpoint}/articles/list`);

    return Articles$;
  }

  public getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.endpoint);

  }

  public get(id:string): Observable<Article> {

    const Article$ = this.http.get<Article>(`${this.endpoint}/articles/list/${id}`);
    console.log(`${this.endpoint}/articles/list/${id}`);
    return Article$;
  }
  public getAuthArticle(id:string): Observable<Array<Article>>{
    const Articles$ = this.http.get<Article[]>(`${this.endpoint}/articles/byauthor/${id}`);
    return Articles$;
  }
  public getone(id:string): Observable<Article> {

    const Articles$ = this.http.get<Article>(`${this.endpoint}/articles/list/${id}`);
    console.log(`${this.endpoint}/articles/list/${id}`);
    return Articles$;
  }
  public updateArticle(newArticle: Article){
    const url = `${this.endpoint}/articles/list/${newArticle.id}`;
    return this.http.put<any>(url, newArticle);
  }
  public uploadarticle(form: FormData, id){
    this.http.post(`${this.endpoint}/articles/upload/${id}`, form)
      .subscribe((response) => {
        console.log('response received is ', response);
      })
  }
  public publishArticle(newArticle: Article): Observable<any> {
    const url = `${this.endpoint}/articles/publish`;
    return this.http.post<any>(url, newArticle)
      .pipe(
        catchError(this.handleError<Article>(`publish Article`))
      );
  }
  public deleteArticle(Article:Article):Observable<Array<Article>>{
    const url = `${this.endpoint}/articles/list/${Article.id}`;
    return this.http.post<Array<Article>>(url,Article);
  }
//   public getAuthor(id:string):Observable<User>{
//     const auth$ = this.http.get<User>(`${this.endpoint}/games/author/:${id}`);
//     return auth$;
//   }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
