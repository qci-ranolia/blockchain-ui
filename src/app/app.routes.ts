import { Routes } from '@angular/router';

import { AuthGuard } from './service/ZauthGuard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component:HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent },
  { path: '**', redirectTo:'/login' }
];
