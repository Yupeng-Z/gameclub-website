import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { identifierModuleUrl } from '@angular/compiler';
import {AuthService} from '../services/auth.service'

import {Game} from '../model/game';
import {User} from '../model/users';
import {GamesService} from '../services/game.service'

@Component({
  //selector: 'ngbd-modal-content',
  templateUrl:'./game1.html',
  styleUrls: ['./game1.scss']  
  
})
export class ModalContent implements OnInit{
  @Input() gameID: string;
  @Input() Player:User
  @Input() game1:Game
  game:Game;
  like="heart-outline"
  gamerating: Number;
  authorid:String;
  authorname:String;
  constructor(public activeModal: NgbActiveModal,private gameservice:GamesService,private authorservice:AuthService) {
    //this.game = gameservice.getone(this.gameID);
    //this.gameservice.getone(this.gameID).toPromise().then(game=>{this.rating=game.rating;this.author=game.author;console.log(game)});
  }
  ngOnInit(): void{
    this.gameservice.getone(this.gameID).toPromise().then(game=>{
      this.game=game
      if(game.like.indexOf(this.Player.id)>=0){
        this.like="heart"
      }else{
        this.like="heart-outline"
      }
      this.gamerating=game.rating;this.authorid=game.author;
      this.authorservice.getUserProfile(this.authorid).toPromise().then(authorpf=>{this.authorname=authorpf.name});
    });//this.author=game.author;console.log(game)
    
  }
  setlike(){
    console.log(this.Player)
    if(this.like=="heart-outline"){
      
      this.game.like.push(this.Player.id)
      this.gameservice.updateGame(this.game).toPromise().then();
      this.like="heart"
    }else{
      this.game.like.splice(this.game.like.indexOf(this.Player.id),1)
      this.gameservice.updateGame(this.game).toPromise().then()
      this.like="heart-outline"

    }
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() gameID: string;
  @Input() Player:User
  @Input() game1:Game
  // @Input() game:Game
  
  //rating: Number;
  author:String;
  constructor(private modalService: NgbModal,private gameservice:GamesService) {
    //this.gameservice.getone(this.gameID).toPromise().then(game=>{this.rating=game.rating;this.author=game.author;console.log(game)});
  }
  open() {
    console.log(this.Player)
    // console.log(this.gameID)
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.gameID=this.gameID;
    modalRef.componentInstance.Player=this.Player
    modalRef.componentInstance.game1=this.game1
    // modalRef.componentInstance.game=this.game
    //modalRef.componentInstance.rating=this.rating;
  }
}