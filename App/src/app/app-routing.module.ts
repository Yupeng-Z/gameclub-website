import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component'
import { AuthGuard } from "./services/auth.guard";
import { homepageComponent } from './homepage/homepage.component';
import {GamesComponent} from './games/games.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {ArticlesComponent} from './articles/articles.component';
import {ArticledetailComponent} from './articledetail/articledetail.component';

const routes: Routes = [
    //{ path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'log-in', component: LoginComponent },
    { path: 'register', component: RegisterComponent },//RegisterComponent
    { path: 'sign-up', component: RegisterComponent },
    { path: 'games', component: GamesComponent ,canActivate: [AuthGuard]},
    //{ path: 'homepage/:id', component: homepageComponent, canActivate: [AuthGuard] },
    { path: 'homepage', component: homepageComponent,canActivate: [AuthGuard] },
    { path: 'userprofile', component: UserprofileComponent,canActivate: [AuthGuard] },
    //{ path: 'profile', redirectTo: '/homepage/:id', pathMatch: 'full' }
   { path: 'articles', component: ArticlesComponent ,canActivate: [AuthGuard]},
    {path: 'detail/:id', component: ArticledetailComponent, canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
