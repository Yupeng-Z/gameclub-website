import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';
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
export class CommentService {

  //private serverUrl = environment.serverBaseURL;
  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  public list(): Observable<Array<Comment>> {

    const Comments$ = this.http.get<Comment[]>(`${this.endpoint}/comments/list`);

    return Comments$;
  }

  public getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.endpoint);

  }

  public get(id:string): Observable<Comment> {

    const Comment$ = this.http.get<Comment>(`${this.endpoint}/comments/list/${id}`);
    console.log(`${this.endpoint}/comments/list/${id}`);
    return Comment$;
  }
  public getAuthComment(id:string): Observable<Array<Comment>>{
    const Comments$ = this.http.get<Comment[]>(`${this.endpoint}/comments/byauthor/${id}`);
    return Comments$;
  }
  public getArtiComment(id:string): Observable<Comment>{
    const Comment$ = this.http.get<Comment>(`${this.endpoint}/comments/byarticle/${id}`);
    return Comment$;
  }
  public getone(id:string): Observable<Comment> {

    const Comment$ = this.http.get<Comment>(`${this.endpoint}/comments/list/${id}`);
    console.log(`${this.endpoint}/comments/list/${id}`);
    return Comment$;
  }
  public updateComment(newComment: Comment){
    const url = `${this.endpoint}/comments/list/${newComment.id}`;
    return this.http.put<any>(url, newComment);
  }
  public uploadcomment(form: FormData, id){
    this.http.post(`${this.endpoint}/comments/upload/${id}`, form)
      .subscribe((response) => {
        console.log('response received is ', response);
      });
  }
  public publishComment(newComment: Comment): Observable<any> {
    const url = `${this.endpoint}/comments/publish`;
    return this.http.post<any>(url, newComment)
      .pipe(
        catchError(this.handleError<Comment>(`publish Comment`))
      );
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
