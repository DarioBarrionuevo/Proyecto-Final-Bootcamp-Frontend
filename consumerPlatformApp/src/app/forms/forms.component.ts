import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  formUser: FormGroup;
  formOrg: FormGroup;
  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService
  ) {
    this.formUser = new FormGroup({
      name: new FormControl(),
      surname1: new FormControl(),
      surname2: new FormControl(),
      email: new FormControl(),
      phone_number: new FormControl(),
      user_name: new FormControl(),
      password: new FormControl(),
      zip_code: new FormControl(),
    });
    this.formOrg = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      nif: new FormControl(),
      email: new FormControl(),
      phone_number: new FormControl(),
      user_name: new FormControl(),
      password: new FormControl(),
      delivery_points: new FormControl(),
    });
  }

  ngOnInit(): void {}

  // getUserData(): void {
  //   const userData = this.formUser.value;
  //   console.log('FormsComponent -> getUserData -> userData', userData);
  // }
  // getOrganizationData(): void {
  //   const userData = this.formOrg.value;
  //   console.log('FormsComponent -> getUserData -> userData', userData);
  // }

  async addUserToBBDD(): Promise<any> {
    try {
      const userData = this.formUser.value;
      console.log('FormsComponent -> addUserToBBDD -> userData', userData);

      const jsonCreateUser = this.peticionesService.createUser(userData);
      console.log('User created');

      this.formUser.reset();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['/userLogin']);
  }
  async addOrganizationToBBDD(): Promise<any> {
    try {
      const orgData = this.formOrg.value;
      const jsonCreateOrganization = this.peticionesService.createOrganization(
        orgData
      );
      console.log('Organization created');

      this.formOrg.reset();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['/organizationLogin']);
  }
}
