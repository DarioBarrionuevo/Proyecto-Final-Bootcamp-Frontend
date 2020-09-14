import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  formUser: FormGroup;
  formOrg: FormGroup;
  constructor() {
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
  getOrganizationData(): void {
    const userData = this.formOrg.value;
    console.log('FormsComponent -> getUserData -> userData', userData);
  }

  async addUserToBBDD() {
    try {
      const userData = this.formUser.value;

      fetch('http://localhost:3000/users/createUser', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
          // Accept: 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log('RESPONSE', json);
          this.formUser.reset();
        });
    } catch (error) {
      console.log(error);
    }
  }
  async addOrganizationToBBDD() {
    try {
      const orgData = this.formOrg.value;

      fetch('http://localhost:3000/organizations/createOrganization', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(orgData),
        headers: {
          'Content-Type': 'application/json',
          // Accept: 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log('RESPONSE', json);
          this.formOrg.reset();
        });
    } catch (error) {
      console.log(error);
    }
  }
}
