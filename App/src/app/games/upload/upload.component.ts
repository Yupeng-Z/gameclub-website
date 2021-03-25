import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';
import {Game} from '../../model/game';
import {User} from '../../model/users';
import {GamesService} from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
// import * as fs from "fs"
// import * as fs from "fs"
// import * as unzip from "unzip"

// import { saveAs } from 'file-saver';
@Component({ 

  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public userid ;
  currentUser: User;
  gamepic:File
  firstForm:  FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  zipgame:File
  Gameinfo:Game={
    id:"",
    name:"",
    rating:0,
    description:"",
    author:"",
    like:[],
    icon:"",
    photo:"",
    gameurl:"",
    ratingDetail:[]
  }
  constructor(private fb: FormBuilder,private service:GamesService,public authService: AuthService,) {
    this.userid = localStorage.getItem("currid");//this.actRoute.snapshot.paramMap.get('id');
    //window.localStorage.setItem("currid", id);
    this.authService.getUserProfile(this.userid).subscribe(res => {
      this.currentUser = res; //res.msg
    })
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      gamefile: ['', Validators.required],

    });

    this.secondForm = this.fb.group({
      gamename: ['', Validators.required],
      gamedescription: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      displayphoto: ['', Validators.required],
    });
  }

  confirm(){
    console.log(this.firstForm.value)
    console.log(this.secondForm.value)
    console.log(this.thirdForm.value)
    console.log(this.zipgame)

    var form = new FormData();
    form.append("file", this.zipgame);
    var picform = new FormData(); 
    picform.append("file",this.gamepic)
    //gameinfo
    this.Gameinfo.id="";
    this.Gameinfo.name=this.secondForm.get('gamename').value;
    this.Gameinfo.rating=0;
    this.Gameinfo.description=this.secondForm.get('gamedescription').value;;
    this.Gameinfo.author=this.currentUser.id////name;
    this.Gameinfo.like=[];
    this.Gameinfo.icon="";
    
    this.Gameinfo.photo=this.gamepic.name.substring(this.gamepic.name.lastIndexOf('.')) //+new uuid()+"."+gamepic;
    this.Gameinfo.gameurl=`${this.firstForm.get('gamefile').value}`;

    this.service.publishGame(this.Gameinfo).subscribe(data=>{
      this.service.uploadgame(form,data.id)

      // var fs = require("fs");
      // var unzip = require("unzip");

      this.service.uploadpic(picform,data.id)

    }

    )
  }
  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }
  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }
  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
  onjpgChange(event){
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.gamepic=file
      console.log(this.gamepic.name.substring(this.gamepic.name.lastIndexOf('.')))
      
    }
  }
  onFileChange(event){

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.zipgame=file

      // console.log(this.zipgame)


    }
  }

}
