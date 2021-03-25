import { Component, OnInit,QueryList, ViewChildren,Input } from '@angular/core';
import {GamesService} from '../services/game.service'
import { Game } from '../model/game';

import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {GametableService} from '../services/table.service';
import {User} from '../model/users';
//import {Game} from './Game';
//import {GameService} from './Game.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  currentUser: User;
  ngOnInit(): void{

  }
  public gamelist:Observable<Game[]>;
  //public gametablelist: Game[];
  //games$: Observable<Game[]>;
  total$: Observable<number>;
  //total$: number;
  id:string;
  gl:Array<Game>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public gamelistServices: GamesService,public authService: AuthService,
    private actRoute: ActivatedRoute,public service : GametableService) {
    
    /////////////
    this.id = localStorage.getItem("currid");;
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.currentUser = res; //res.msg
    })
    this.gamelistServices.list().toPromise().then(l=>{this.gl=l;})
    //this.gamelistServices.getAuthGame(this.id).toPromise().then(gamelist=>{this.gametablelist=gamelist;console.log(this.gamelist)});
    this.gamelist = service.games$;
    this.total$ = service.total$;
    //this.total$ = this.gamelist.length;
    
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  deletegame(thisgid:string):void{//thisgid:string//game:Game
    //var game:Game;
    //console.log(game);
    //this.gamelistServices.getone(thisgid).toPromise().then(g=>{game=g;console.log(game);})
    //this.gl.splice(this.gl.indexOf(game),1);
    //this.gamelistServices.deleteGame(game).toPromise().then();
    this.gamelistServices.deleteGamebyid(thisgid).toPromise().then(g=>{console.log(g);});//.toPromise().then(g=>{console.log(g);});
    //console.log(thisgid);
  }

}








// @Component({
//   selector: 'app-gameslist',
//   template: ' ',
//   //styleUrls: ['./table.component.scss']
// })
// export class tableGameslist  {
//   gamelist: Array<Game>;
//   games$: Observable<Game[]>;
//   id:string;

//   @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

//   constructor(public gamelistServices: GamesService,public authService: AuthService,
//     private actRoute: ActivatedRoute) {
    
//     /////////////
//     this.id = localStorage.getItem("currid");;
//     this.authService.getUserProfile(this.id).subscribe(res => {
//       //this.currentUser = res; //res.msg
//     })
//     this.gamelistServices.getAuthGame(this.id).toPromise().then(gamelist=>{this.gamelist=gamelist;console.log(this.gamelist)});

    
//   }
// }