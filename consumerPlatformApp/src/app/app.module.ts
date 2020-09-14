import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { FormsComponent } from './forms/forms.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaErrorComponent,
    FormsComponent,
    UserHomeComponent,
    OrganizationHomeComponent,
    UserCheckoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
