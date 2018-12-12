import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbSidebarModule, NbThemeModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './main/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './service/service.component';
import { MainViewComponent } from './main/main-view/main-view.component';
import { SummaryComponent } from './main/summary/summary.component';
import { CreateUserComponent } from './main/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ServiceComponent,
    MainViewComponent,
    SummaryComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbSidebarModule,
    AppRoutingModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }