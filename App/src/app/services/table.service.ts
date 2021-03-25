'use strict'
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Game } from '../model/game';
//import {tableGameslist} from '../table/table.component';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../table/sortable.directive';
import {GamesService} from '../services/game.service'
import { promise } from 'protractor';

interface SearchResult {
  games: Game[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(games: Game[], column: SortColumn, direction: string): Game[] {
  if (direction === '' || column === '') {
    return games;
  } else {
    return [...games].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(Game: Game, term: string, pipe: PipeTransform) {
  return Game.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(Game.name).includes(term)
    || pipe.transform(Game.description).includes(term);
}

@Injectable({providedIn: 'root'})
export class GametableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _games$ = new BehaviorSubject<Game[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  public gl:Game[]; 

  constructor(private pipe: DecimalPipe,public gameservice : GamesService,) {

    this.gameservice.getAuthGame(localStorage.getItem("currid")).toPromise().then(arr=>{
      this.gl=arr;
      console.log(this.gl);
    })

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._games$.next(result.games);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get games$() { return this._games$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // private async _search(): Promise<Observable<SearchResult>> {
  //   const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

  //   // 1. sort
  //     var data = await this.gameservice.list().toPromise()
  //     var games = sort(data, sortColumn, sortDirection);
  //     // 2. filter
  //     games = games.filter(Game => matches(Game, searchTerm, this.pipe));
  //     const total = games.length;

  //         // 3. paginate
  //     games = games.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  //     return of({games, total});


  // }


  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    // this.gameservice.list().toPromise().then(arr=>{
    //   tableGameslist=arr
    // })
    // 1. sort
    var games : Game[] = this.gl;//sort(this.gl.returngl(), sortColumn, sortDirection);
    //games  = sort(tableGameslist, sortColumn, sortDirection);
    // let games  = this.gameservice.getAuthGame(localStorage.getItem("curr")).toPromise().then(arr=>{
    //   return sort(arr, sortColumn, sortDirection);
    //   return games;
    // })
    // 2. filter
    games = games.filter(Game => matches(Game, searchTerm, this.pipe));
    const total = games.length;

    // 3. paginate
    games = games.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({games, total});
  }



}




// export class gamesl{
//   gamelist:Game[]
//   constructor(public gamelistServices: GamesService){
//     gamelistServices.list().toPromise().then(gl=>{
//       this.gamelist=gl;
//     })
//   }
//   public returngl(){
//     return this.gamelist;
//   }

//}