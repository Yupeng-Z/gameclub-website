import { Component, OnInit,TemplateRef, ViewChild, Input,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import {User} from '../model/users';
import { LoginComponent } from '../login/login.component';

import { Router,NavigationEnd } from '@angular/router';

import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// @Component({
//   selector: 'ngbd-modal-content',
//   templateUrl:'./loginwindow.html'
  
// })
// export class ModalContent {
//   @Input() name;

//   constructor(public activeModal: NgbActiveModal) {}
// }
////////////////////////////


@Component({
  selector: 'app-Loginpage',
  templateUrl: './loginwindow.html',
  // templateUrl: './loginwindow.html',
  //styleUrls: ['./nav-bar.component.scss']
})
export class Loginpage implements OnInit {
  ngOnInit(): void {
  }
  constructor(){}
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  collapsed = true;
  public id ;
  public title = ' ';

  currentUser: User;

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private windowService: NbWindowService,
    public router:Router,
    private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window,
    //private modalService: NgbModal
  ) {
    router.events
      //.filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        // 当路由发生变化，存储在浏览器里面的的用户信息发生变化的时候刷新组件
        this.id = localStorage.getItem("currid");
        this.authService.getUserProfile(this.id).subscribe(res => {
          this.currentUser = res; //res.msg
        })
        //console.log(this.currentUser);
    });


    this.id = localStorage.getItem("currid");//this.actRoute.snapshot.paramMap.get('id');
    //window.localStorage.setItem("currid", id);
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.currentUser = res; //res.msg
    })
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title=='Logout'){
          this.logout();
        }
        if(title=='Profile'){
          //this.logout();
        }
        //this.window.alert(`${title} was clicked!`)
      });
  }

  // add() : void{
  //   this.title="a8 updated";
  // }

  logout() {
    //localStorage.removeItem("currid");
    this.authService.doLogout();
    location.reload();
  }

  openWindow() {
    //this.windowService.open(Loginpage, { title: `Login`,});
    //const modalRef = this.modalService.open(ModalContent);
    //modalRef.componentInstance.name = 'World';
    this.router.navigate(['log-in']);
  }

  hideSubMenu(m){
    //var subMenu = m.getElementsByClassName("ul");
    m.style.display = "none";
  }

}
