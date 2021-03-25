import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup , FormControl, Validators} from "@angular/forms";

import { AuthService } from "../services/auth.service";

import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'Register';
  registerForm: FormGroup;
  user: any = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastrService: NbToastrService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmpassword: ['']
    })
  }

  ngOnInit() {
    
    this.registerForm = this.fb.group({
        'name': new FormControl(this.user.name, [
          Validators.required,
          Validators.minLength(1),
        ]),
        'email': new FormControl(this.user.email, [
            Validators.required,
            Validators.email,
            //Validators.minLength(10),
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
        ]),
        'password': new FormControl(this.user.password, [
          Validators.required,
          Validators.minLength(6),
        ]),
        'confirmpassword': new FormControl(this.user.confirmpassword, [
          Validators.required,
          Validators.minLength(6),
        ]),
        
    })
  }
  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get confirmpassword(){
    return this.registerForm.get('confirmpassword');
  }

  registerUser() {
    this.authService.signUp(this.registerForm.value)
    // .toPromise().then((res) => {
    //     this.successToast('top-up', 'success');
    //     this.registerForm.reset();
    //     window.location.href="/log-in";
    //   }).catch(err=>{
    //   this.errorToast('top-up', 'warning')});
      
    .toPromise().then((res) => {
      //if (res.result!=null)             //&&(res.result.password==res.result.confirmpassword)
      //if (res.result) {
        console.log(res);
        this.registerForm.reset();
        this.successToast('top-up', 'success');
        //this.router.navigate(['log-in']);
      //}else{
        //this.errorToast('top-up', 'warning');
       //}
      
     }).catch(err=>{
      this.errorToast('top-up', 'warning');
     })

  }

  get route() {
    const rt = this.router.url;

    if(rt == '/register')
        document.title = this.title = 'Register';
    else
        document.title = this.title = 'Login';

    return rt;
  }

/**
   * Method responsible for handling the
   * password recovery form's submit event
   *
   * @param value Password recovery form's value
   */
  handleRegister(value) {

    if(!this.registerForm.touched || this.registerForm.invalid)
        return;

    console.log('handleRegister');
  }
  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      ` Success`,
      { position, status });
  }

  successToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Register Success!Please login~`,
      { position, status });
  }

  errorToast(position, status) {
    this.toastrService.show(
      status,
      `Please refill the blank`,
      { position, status });
  }

}
