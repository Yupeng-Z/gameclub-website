import { Injectable } from '@angular/core';
import { User } from '../model/users';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NbToastrService, NbComponentStatus } from '@nebular/theme';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private toastrService: NbToastrService
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    console.log(user)
    let api = `${this.endpoint}/auth/sign-up`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }
  verrifyuser(user: User){
    //const helper = new JwtHelperService();
    return this.http.post<any>(`${this.endpoint}/auth/login`, user);
    
  }
  // Sign-in
  signIn(user: User)  {
    const helper = new JwtHelperService();
    return this.http.post<any>(`${this.endpoint}/auth/login`, user)
    .pipe(
        catchError(this.handleError)
      ).subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        let decodedToken = helper.decodeToken(res.token);
        console.log(decodedToken._id);
        //if(decodedToken._id==null) this.errorToast('top-up', 'warning');
        this.getUserProfile(decodedToken._id).subscribe((res) => {
           
          this.currentUser = res;
          //this.router.navigate(['homepage/' + decodedToken._id]);
          
          localStorage.setItem("currid",decodedToken._id);
          this.router.navigate(['homepage']);
          //this.showToast('top-up', 'success');
          // this.router.navigateByUrl('../nav-bar/nav-bar.component', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['homepage']);
          // });
        })
      })
  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      ` Login Success!`,
      { position, status });
  }

  errorToast(position, status) {
    this.toastrService.show(
      status,
      `Wrong user or password!`,
      { position, status });
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    //localStorage.removeItem("currid");
    if (removeToken == null) {
      //this.router.navigate(['log-in']);
      this.router.navigate(['homepage']);
    }
  }

  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/auth/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
    // const author$ = this.http.get<User>(`${this.endpoint}/auth/${id}`);
    // return author$;
  }

  // updateProfile(user: User): Observable<any> {
  //   const url = `${this.endpoint}/auth/update-profile`;
  //   return this.http.put(url, user, httpOptions)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  updateProfile(id: String,updateinfo:User):Observable<User> {
    const url = `${this.endpoint}/auth/${id}`;
    let user$ = this.http.put<User>(url,updateinfo);
    return user$;
  }



//   signIn(user: User) {
//     return this.http.post<any>(`${this.endpoint}/auth/login`, user)
//       .subscribe((res: any) => {
//         localStorage.setItem('access_token', res.token)
//         console.log(res.token)
//         this.getUserProfile(this.getToken()).subscribe((res) => {
//         //   this.currentUser = res;
          
//         //   this.router.navigate(['homepage/' + res.msg._id]);
//         })
//       })
//   }
  // User profile
//   getUserProfile(token): Observable<any> {
//     const helper = new JwtHelperService();
//     const decodedToken = helper.decodeToken(token);
//     console.log(decodedToken._id)
//     let api = `${this.endpoint}/homepage/:${decodedToken._id}`;
//     return this.http.get(api).pipe(
//       map((res: Response) => {
//         return res || {}
//       }),
//       catchError(this.handleError)
//     )
//   }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
     
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
    }
    
    return throwError(msg);
  }
}