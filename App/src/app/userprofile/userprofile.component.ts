import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from '../model/users';
import {ProfileService} from '../services/profile.service';
import { Observable } from 'rxjs';
import {Article} from '../model/article';
import { ArticleService } from '../services/article.service'
import { FormBuilder, FormGroup , FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  active = 'top';
  currentUser: User;
  updateUser: any = {
    id:'',
    //likedgames:[],
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  };
  articlelist:Array<Article>;
  myarticlelist:Array<Article>;
  private as: ArticleService
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    //public profileService: ProfileService
  ) {
    //let id = this.actRoute.snapshot.paramMap.get('id');
    //window.localStorage.setItem("currid", id);
    let id = localStorage.getItem("currid");;
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
      
    })
  }

  ngOnInit(): void {
    this.as.list().toPromise().then(articlelist=>{this.articlelist=articlelist;console.log(this.articlelist)});
    var count = 0;
    for (var n=0; n<this.articlelist.length; n++) {
      if(this.articlelist[n].author == this.currentUser.id) {
        this.myarticlelist[count] = this.articlelist[n];
        count++;
      }
    }
  }
  enablealter() {
    (document.getElementById("nameinput") as HTMLInputElement).disabled=false;
    (document.getElementById("emailinput") as HTMLInputElement).disabled=false;
    (document.getElementById("alterbtn") as HTMLInputElement).disabled=true;
    (document.getElementById("savebtn") as HTMLInputElement).disabled=false;
  }
  
  save() {
    (document.getElementById("nameinput") as HTMLInputElement).disabled=true;
    (document.getElementById("emailinput") as HTMLInputElement).disabled=true;
    (document.getElementById("alterbtn") as HTMLInputElement).disabled=false;
    (document.getElementById("savebtn") as HTMLInputElement).disabled=true;
    var newName = (document.getElementById("nameinput") as HTMLInputElement).value;
    var newEmail = (document.getElementById("emailinput") as HTMLInputElement).value;
    console.log(newName);
    //this.updateUser.likedgames=this.currentUser.likedgames;
    this.updateUser.id=this.currentUser.id;
    this.updateUser.name=newName;
    this.updateUser.email=newEmail;
    this.updateUser.password=this.currentUser.password;
    //this.updateUser.confirmpassword=this.currentUser.password;
    this.authService.updateProfile(this.updateUser.id,this.updateUser).toPromise().then();
    //this.authService.updateProfile(this.updateUser.value).toPromise().then();testupdateProfile
    //let updateUser$: Observable<User> = this.profileService.test1(this.currentUser.id, newEmail, newName, this.currentUser.password);
    // updateUser$.subscribe(User => {
    //   this.updateUser=User;
    // });
    window.location.reload();
  }
}
