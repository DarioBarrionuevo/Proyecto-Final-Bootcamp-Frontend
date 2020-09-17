import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginOrganizationComponent } from './login-organization/login-organization.component';
import { OrganizationHomeComponent } from './organization-home/organization-home.component';
import { PaginaErrorComponent } from './pagina-error/pagina-error.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'userLogin', component: LoginUserComponent },
  { path: 'organizationLogin', component: LoginOrganizationComponent },
  { path: 'forms', component: FormsComponent },
  {
    path: 'userHome/:id',
    component: UserHomeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'userCheckout/:id/:idOrg',
    component: UserCheckoutComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'orgHome/:id',
    component: OrganizationHomeComponent,
    canActivate: [LoginGuard],
  },
  // guard que compare l token descrifado con el username del storage
  { path: '**', component: PaginaErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
