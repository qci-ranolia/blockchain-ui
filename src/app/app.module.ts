import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpEventType,  HttpClient,  HttpRequest } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';
import { AuthGuard } from './service/ZauthGuard';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { APIService } from './service/APIService';
import { ProjectService } from './service/ProjectService';
import { FloatuserComponent } from './home/floatuser/floatuser.component';
import { ClaimaccountComponent } from './home/claimaccount/claimaccount.component';
import { CreateassetComponent } from './home/createasset/createasset.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { TableComponent } from './home/table/table.component';
import { SummaryComponent } from './home/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FloatuserComponent,
    ClaimaccountComponent,
    CreateassetComponent,
    NavigationComponent,
    TableComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    AuthGuard,
    APIService,
    ProjectService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }