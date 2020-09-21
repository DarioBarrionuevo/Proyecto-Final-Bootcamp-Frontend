import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { FormsComponent } from './forms/forms.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginOrganizationComponent } from './login-organization/login-organization.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaErrorComponent,
    FormsComponent,
    UserHomeComponent,
    OrganizationHomeComponent,
    UserCheckoutComponent,
    HomeComponent,
    LoginUserComponent,
    LoginOrganizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBP4AqgTC6EPZ8HMKMgmvUOxKlkHgigB54',
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
