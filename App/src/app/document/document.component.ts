import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

import {User} from '../model/users';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  currentUser: User;

  constructor(public authService: AuthService) {
    let id = localStorage.getItem("currid");
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res; //res.msg
    })
  }

  ngOnInit(): void {
  }

}
