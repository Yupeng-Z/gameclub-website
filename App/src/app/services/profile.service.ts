import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {User} from '../model/users';

@Injectable({
    providedIn: 'root'
})

export class ProfileService { 

    UserResource: string;
    UserResourceURL: string;

    constructor(private http: HttpClient) {
        this.UserResource = 'auth';
        this.UserResourceURL = `${environment.serverBaseURL}/${this.UserResource}`;
    }

    test1(id: string, email: string, name: string, password: string) {
        let updateUser = new User(id, email, name, password);
        return this.http.put<User>(this.UserResourceURL+ "/" + id, updateUser);
    }
}