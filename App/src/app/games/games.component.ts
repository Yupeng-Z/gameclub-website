import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from '../model/users';
import {Game} from '../model//game';
import {GamesService} from '../services/game.service'

import { NbSearchService } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NbWindowService } from '@nebular/theme';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'ngbd-modal-content',
  templateUrl:'./upload.html',
  //styleUrls: ['./upload.scss']
  
})
export class UploadContent {
  @Input() name;
  
  constructor() {}
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  //id: string;
  currentUser: User;
  testgameid:string="5e9ac63651346c8bdc64ca8c"
  value = '';
  gamelist:Array<Game>;
  tmpgl:Array<Game> = [];
  gamesid="game1-angrybirds"
  gamesids = [
    { id: 'game1-angrybirds' },
    { id: 'game2-balanceball' },
  ];
  constructor(public authService: AuthService,
              private actRoute: ActivatedRoute,
              private searchService: NbSearchService,
              private windowService: NbWindowService,
              private gamelistServices : GamesService,
              //private modalService: NgbModal
        ) {
    // actRoute.queryParams.subscribe(queryParams => {
    //   this.id = queryParams.id;
    // });
    //let id = this.actRoute.snapshot.paramMap.get('id');
    let id = localStorage.getItem("currid");
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
      console.log(this.currentUser)
    })

    this.gamelistServices.list().toPromise().then(l=>{this.gamelist=l;});
    
    
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        for(let game of this.gamelist){
          if(game.name.search(this.value)!=-1){
            this.tmpgl.push(game);
          }
        }
        console.log(this.tmpgl);
      })
  }

  ngOnInit(): void {
    this.tmpgl=[];
    this.gamelistServices.list().toPromise().then(gamelist=>{this.gamelist=gamelist;this.gamelist.reverse();console.log(this.gamelist)});
  }


  open() {
    // const modalRef = this.modalService.open(UploadContent);
    // modalRef.componentInstance.name = 'World';
    this.windowService.open(UploadContent, { title: `Upload`,});
  }
  downloadgame(event){
    console.log(event.target.getAttribute("id"))
    window.open("http://localhost:3000/download/"+event.target.getAttribute("id"))
  }      


}
