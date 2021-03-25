import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {User} from '../model/users'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  //private serverUrl = environment.serverBaseURL;
  endpoint: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  public list(): Observable<Array<Game>> {

    const Games$ = this.http.get<Game[]>(`${this.endpoint}/games/list`);

    return Games$;
  }
  public get(id:string): Observable<Array<Game>> {

    const Games$ = this.http.get<Game[]>(`${this.endpoint}/games/list/${id}`);
    console.log(`${this.endpoint}/games/list/${id}`);
    return Games$;
  }
  public getAuthGame(id:string):Observable<Array<Game>>{
    const Games$ = this.http.get<Game[]>(`${this.endpoint}/games/byauthor/${id}`);
    return Games$;
  }
  public getone(id:string): Observable<Game> {

    const Games$ = this.http.get<Game>(`${this.endpoint}/games/list/${id}`);
    console.log(`${this.endpoint}/games/list/${id}`);
    return Games$;
  }
  public updateGame(newGame: Game){
    const url=`${this.endpoint}/games/list/${newGame.id}`;
    return this.http.put<any>(url,newGame);
  }
  public uploadgame(form:FormData,id:string){
    this.http.post(`${this.endpoint}/games/upload/${id}`, form)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
  }
  public uploadpic(form:FormData,id:string){
    this.http.post(`${this.endpoint}/games/uploadpic/${id}`, form)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
  }
  public publishGame(newGame: Game): Observable<any> {
    const url = `${this.endpoint}/games/publish`;
    return this.http.post<any>(url, newGame)
    .pipe(
      catchError(this.handleError<Game>(`publish Game`))
    );
  }
  public deleteGame(Game:Game):Observable<Array<Game>>{
    const url = `${this.endpoint}/games/list/${Game.id}`;
    return this.http.post<Array<Game>>(url,Game);
  }

  public deleteGamebyid(id:string){
    const url = `${this.endpoint}/games/list/${id}`;
    return this.http.delete<Game[]>(url);
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
