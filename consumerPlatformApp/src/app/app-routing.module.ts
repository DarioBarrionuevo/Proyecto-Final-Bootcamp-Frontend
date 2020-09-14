import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'userHome', component: UserHomeComponent },
  { path: 'userCheckout', component: UserCheckoutComponent },
  { path: 'orgHome', component: OrganizationHomeComponent },
  { path: '**', component: PaginaErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
