import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent,Loginpage } from './nav-bar/nav-bar.component';
import { GametestComponent } from './gametest/gametest.component';


import { FormGroup, FormControl,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleItemsComponent} from "./article-items/article-items.component";
import { ArticlesComponent, UploadArticleContent} from "./articles/articles.component";

import { AuthService } from "./services/auth.service";
import { homepageComponent } from './homepage/homepage.component';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { ToolbarComponent } from './toolbar/toolbar.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { FootbarComponent } from './footbar/footbar.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent, ModalContent } from './modal/modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { GamesComponent, UploadContent } from './games/games.component';
import { RatingComponent } from './rating/rating.component';
import { DocumentComponent } from './document/document.component';

import {MaterialModule} from './material-module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//nebular:
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {NbThemeModule, NbLayoutModule, NbTabsetModule, NbBadgeModule,NbToastrModule} from '@nebular/theme';

import { NbSidebarModule, NbButtonModule,NbWindowModule,NbContextMenuModule } from '@nebular/theme';
import { NbSearchModule,NbCardModule,NbMenuModule,NbUserModule,NbStepperModule } from '@nebular/theme';
//
import { UploadComponent } from './games/upload/upload.component';
import { UploadarticlesComponent} from './articles/uploadarticles/uploadarticles.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { TableComponent, } from './table/table.component';

import { DecimalPipe } from '@angular/common';

import { ArticledetailComponent } from './articledetail/articledetail.component';



import {NbIconModule} from '@nebular/theme';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    Loginpage,
    GametestComponent,
    LoginComponent,
    RegisterComponent,
    homepageComponent,
    ToolbarComponent,
    FootbarComponent,
    ModalComponent,
    ModalContent,
    CarouselComponent,
    GamesComponent,
    UploadContent,
    RatingComponent,
    UploadComponent,
    UserprofileComponent,
    TableComponent,
    ArticleItemsComponent,
    ArticlesComponent,
    //tableGameslist
    RatingComponent,
    DocumentComponent,
    ArticledetailComponent,
    UploadArticleContent,
    UploadarticlesComponent,
  ],
  imports: [
    // NgbActiveModal,
    NbBadgeModule,
    BrowserModule,
    NbIconModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSliderModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,

    NbEvaIconsModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbWindowModule.forRoot(),
    NbSearchModule,
    NbCardModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbUserModule,
    NbStepperModule,
    NbTabsetModule,
    NbToastrModule.forRoot(),
    NbBadgeModule,
    NbButtonModule,

    //DecimalPipe

  ],
  providers: [DecimalPipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  //providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
