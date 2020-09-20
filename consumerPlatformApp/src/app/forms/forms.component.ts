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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      surname2: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\+\d{2,3}\)\d{9}$/),
      ]),
      user_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}$/),
      ]),
    });
    this.formOrg = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      nif: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?[A-Z])$/ // nif nie cif
        ),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\+\d{2,3}\)\d{9}$/),
      ]),
      user_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      delivery_points: new FormControl('', [Validators.required]),
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

      const jsonCreateUser = this.peticionesService.createUser(userData);
      alert('!Enhorabuena, usuario creado!');
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
      alert('!Enhorabuena, organización creada!');

      this.formOrg.reset();
    } catch (error) {
      console.log(error);
    }
    this.router.navigate(['/organizationLogin']);
  }
}
