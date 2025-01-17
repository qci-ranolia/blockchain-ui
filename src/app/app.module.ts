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
import { SearchBarComponent } from './home/search-bar/search-bar.component';
import { FormBuilderComponent } from './home/form-builder/form-builder.component';
import { InputTextComponent } from './home/form-builder/input-text/input-text.component';
import { InputPasswordComponent } from './home/form-builder/input-password/input-password.component';
import { InputDropdownComponent } from './home/form-builder/input-dropdown/input-dropdown.component';
import { InputEmailComponent } from './home/form-builder/input-email/input-email.component';
import { InputFileUploadComponent } from './home/form-builder/input-file-upload/input-file-upload.component';
import { InputDatePickerComponent } from './home/form-builder/input-date-picker/input-date-picker.component';
import { DisplayComponent } from './home/display/display.component';

import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { LandingComponent } from './landing/landing.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProfileComponent } from './home/profile/profile.component';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MultipleFileUploadComponent } from './multiple-file-upload/multiple-file-upload.component';

// import { FilePondModule, registerPlugin } from 'ngx-filepond';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// registerPlugin(FilePondPluginFileValidateType);

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
    SummaryComponent,
    SearchBarComponent,
    FormBuilderComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputDropdownComponent,
    InputEmailComponent,
    InputFileUploadComponent,
    InputDatePickerComponent,
    DisplayComponent,
    LandingComponent,
    ProfileComponent,
    MultipleFileUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ChartsModule,
    NgxEchartsModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule/* ,
    FilePondModule */
  ],
  providers: [
    AuthGuard,
    APIService,
    ProjectService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }