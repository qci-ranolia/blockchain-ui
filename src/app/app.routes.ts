import { Routes } from '@angular/router';

import { AuthGuard } from './service/ZauthGuard';
import { HomeComponent } from './home/home.component';
import { FloatuserComponent } from './home/floatuser/floatuser.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ClaimaccountComponent } from './home/claimaccount/claimaccount.component';
import { CreateassetComponent } from './home/createasset/createasset.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'floatuser', component: FloatuserComponent },
  { path: 'claimaccount', component: ClaimaccountComponent },
  { path: 'createasset', component: CreateassetComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload', component: MultipleFileUploadComponent },
  { path: '', component: LandingComponent },
  { path: '**', redirectTo:'' }
]
