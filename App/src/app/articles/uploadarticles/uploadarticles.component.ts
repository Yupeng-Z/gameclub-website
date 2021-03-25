import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';
import {Article} from '../../model/article';
import {User} from '../../model/users';
import {ArticleService} from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { saveAs } from 'file-saver';
import { ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-uploadarticles1',
  templateUrl: './uploadarticles.component.html',
  styleUrls: ['./uploadarticles.component.scss']
})

export class UploadarticlesComponent implements OnInit {
    public userid ;
    currentUser: User;
    firstForm:  FormGroup;
    secondForm:FormGroup;
    @Output() addArticle: EventEmitter<any> = new EventEmitter();
    title: string;
    description: string;
    picture: string;
    author: string;
    CreateDate: string;
    pictureFile:File
    constructor(private fb:FormBuilder,private articleService:ArticleService) {
        this.userid = localStorage.getItem("currid");
        this.firstForm = this.fb.group({
            title: ['', Validators.required],
            content:['', Validators.required]
        });
        this.secondForm = this.fb.group({
            picture:['', Validators.required]
        })
    }
    onFileChange(event){
        if(event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            this.pictureFile=file;
          console.log(this.pictureFile.name.substring(this.pictureFile.name.lastIndexOf('.')))
        }
    }
  submit(){
    var date=new Date().toString()
    date=date.substring(0,date.indexOf("("))
    const article:Article = {
      title : this.firstForm.get("title").value,
      description: this.firstForm.get("content").value,
      CreateDate: date,
      author: this.userid,
      picture: "",
      id:""
    };
    this.articleService.publishArticle(article).toPromise().then(data=>{
      console.log(data);
      data.picture= 'http://localhost:3000/articlepic/'+ data.id+this.pictureFile.name.substring(this.pictureFile.name.lastIndexOf('.'))
      this.articleService.updateArticle(data).toPromise().then(da=>{
          console.log(da)
          var picform = new FormData();
          picform.append('file',this.pictureFile)
          this.articleService.uploadpic(picform,data.id).then( da=>{window.location.reload()})
        }
      )

    })
    //
  }
    ngOnInit(){
    }

    onSubmit(){

    //   const article = {
    //     title : this.title,
    //     description: this.description,
    //     CreateDate: 'Date.now()',
    //     author: this.userid,
    //     picture: this.picture
    //   };
    //   console.log(article)
    //   this.addArticle.emit(article);
    }


}


