import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesBackendService } from '../services/peticiones-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-organization',
  templateUrl: './login-organization.component.html',
  styleUrls: ['./login-organization.component.css'],
})
export class LoginOrganizationComponent implements OnInit {
  formOrg: FormGroup;
  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService,
    private toastr: ToastrService
  ) {
    this.formOrg = new FormGroup({
      user_name: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async organizationLogin(): Promise<any> {
    try {
      const orgData = this.formOrg.value;
      // console.log('LoginOrganizationComponent -> ngOnInit -> orgData', orgData);
      const jsonOrgLogin = await this.peticionesService.organizationLogin(
        orgData
      );
      console.log(
        'LoginOrganizationComponent -> ngOnInit -> jsonOrgLogin',
        jsonOrgLogin
      );

      sessionStorage.setItem(
        'user_name',
        JSON.stringify(jsonOrgLogin.user_name)
      );
      sessionStorage.setItem('token', JSON.stringify(jsonOrgLogin.token));
      sessionStorage.setItem('_id', JSON.stringify(jsonOrgLogin._id));

      this.toastr.info('Login completado correctamente!');

      this.router.navigate([`/orgHome/${jsonOrgLogin._id}`]);
    } catch (error) {
      console.log(error);
    }
  }
}
