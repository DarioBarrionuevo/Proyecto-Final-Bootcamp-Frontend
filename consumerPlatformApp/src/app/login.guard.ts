import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    const idStatus = await JSON.parse(sessionStorage.getItem('_id'));
    // console.log('LoginGuard -> canActivate -> idStatus', idStatus);
    // console.log('LoginGuard -> canActivate -> idStatus', typeof idStatus);

    const id = route.paramMap.get('organizationId');
    // console.log('LoginGuard -> canActivate -> _id', id);
    // console.log('LoginGuard -> canActivate -> _id', typeof id);

    if (id === idStatus) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
