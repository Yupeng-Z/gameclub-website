import { Component, OnInit,HostBinding  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , FormControl, Validators} from "@angular/forms";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

import { AuthService } from "../services/auth.service";

import { Observable, fromEvent } from 'rxjs';

@Component({
  //selector: 'app-login',
  selector: "app-my-login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  title = 'Login';
    user: any = {
      email: '',
      password: '',
    };

    requestID: string;

    //loginForm: FormGroup;
    loginForm:FormGroup = null;
    registerForm:FormGroup = null;

    private index: number = 0;

    //@HostBinding('class')
    //classes = 'wrapper';

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastrService: NbToastrService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })

  }

  ngOnInit() {
    //localStorage.removeItem("currid");
    this.loginForm = this.fb.group({
      'email': new FormControl(this.user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
      ]),
      'password': new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
      ]),
    });

  }

  loginUser() {
    
    this.authService.signIn(this.loginForm.value);
    this.authService.verrifyuser(this.loginForm.value)
    .toPromise().then((res) => {
      this.successToast('top-up', 'success');
    }).catch(err=>{
      this.errorToast('top-up', 'warning')});
    
  }
  verrify(){
    
    if(!this.authService.verrifyuser(this.loginForm.value))this.errorToast('top-up', 'warning');
  }


  /**
     * Returns current route for using in view
     * Also changes document title
     */
    get route() {
      const rt = this.router.url;

      if(rt == '/register')
          document.title = this.title = 'Register';
      else
          document.title = this.title = 'Login';

      return rt;
  }

  /**
   * Returns login form's email field
   */
  get email() {
      return this.loginForm.get('email');
  }

  /**
   * Returns login form's password field
   */
  get password(){
      return this.loginForm.get('password');
  }

  /**
   * Returns password recovery form's email field
   */
  get register(){
      return this.registerForm.get('email');
  }

  /**
   * Method responsible for handling
   * the login form's submit event
   *
   * @param value Login form's value
   */
  handleLogin(value) {

      if(!this.loginForm.touched || this.loginForm.invalid){
        this.errorToast('top-up', 'warning');
        return;
      }
          
      console.log('handleLogin');
  }

  // showToast(status: NbComponentStatus) {
  //   this.toastrService.show(status, `Toast: ${++this.index}`, { status });
  // }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      ` Success`,
      { position, status });
  }

  successToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Login Success!`,
      { position, status });
  }

  errorToast(position, status) {
    this.toastrService.show(
      status,
      `Wrong user or password`,
      { position, status });
  }

  

}
