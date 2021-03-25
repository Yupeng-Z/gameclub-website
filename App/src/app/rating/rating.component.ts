import { Component, OnInit,Input } from '@angular/core';
import { Game } from '../model/game';
import { User } from '../model/users';
import {GamesService} from '../services/game.service'
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() Player:User
  @Input() game:Game;
  constructor(private gameservice:GamesService) { }
  currentRate=0
  rating= 0
  ngOnInit(): void {
    this.rating=this.game.rating
    console.log(this.game)
    console.log("asdasdjhfakddfhajkhfdsjklsadfhkjahsdfjkhadsjkfhajksdhfjkdshajkfhajksdhfdksajhfkjgvhjxczmgbhjcghjdsafgjhd")     
    for(let i =0; i< this.game.ratingDetail.length;i++){      
      if(this.game.ratingDetail[i].user==this.Player.id){
       
        console.log(this.game.ratingDetail[i].rating)        
        this.currentRate=this.game.ratingDetail[i].rating
      }
    }
  }
  changerate(){
    let sum = 0
    let flag=false
    for(let i =0; i< this.game.ratingDetail.length;i++){
      
      if(this.game.ratingDetail[i].user==this.Player.id){
        flag=true
        this.game.ratingDetail[i].rating=this.currentRate
      }
      sum+=this.game.ratingDetail[i].rating
    }
    if(flag==false){
      this.game.ratingDetail.push({user:this.Player.id,rating:this.currentRate})
      sum+=this.currentRate
    }
    sum/=this.game.ratingDetail.length
    this.game.rating=sum
    this.rating=sum
    console.log(this.game)
    this.gameservice.updateGame(this.game).toPromise().then()
  }
  // currentRate = this.game.rating;//8;

}


