import { Routes } from '@angular/router';

import { AuthGuard } from './service/ZauthGuard';
import { HomeComponent } from './home/home.component';
import { FloatuserComponent } from './home/floatuser/floatuser.component';
import { ClaimaccountComponent } from './home/claimaccount/claimaccount.component';
import { CreateassetComponent } from './home/createasset/createasset.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'floatuser', component: FloatuserComponent },
  { path: 'claimaccount', component: ClaimaccountComponent },
  { path: 'createasset', component: CreateassetComponent },
  { path: '**', redirectTo:'/login' }
]
