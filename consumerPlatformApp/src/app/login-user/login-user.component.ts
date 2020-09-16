import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  formUser: FormGroup;
  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService
  ) {
    this.formUser = new FormGroup({
      user_name: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  async userLogin(): Promise<any> {
    try {
      const userData = this.formUser.value;
      console.log('LoginUserComponent -> ngOnInit -> userData', userData);
      const jsonUserLogin = await this.peticionesService.userLogin(userData);
      console.log(
        'LoginUserComponent -> ngOnInit -> jsonUserLogin',
        jsonUserLogin
      );

      sessionStorage.setItem(
        'user_name',
        JSON.stringify(jsonUserLogin.user_name)
      );
      sessionStorage.setItem('token', JSON.stringify(jsonUserLogin.token));
      sessionStorage.setItem('_id', JSON.stringify(jsonUserLogin._id));
      this.router.navigate([`/userHome/${jsonUserLogin._id}`]);
    } catch (error) {
      console.log(error);
    }
  }
}
