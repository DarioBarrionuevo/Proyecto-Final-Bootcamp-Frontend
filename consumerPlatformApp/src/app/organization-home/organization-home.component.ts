import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css'],
})
export class OrganizationHomeComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('user_name'));
  id = JSON.parse(sessionStorage.getItem('_id'));
  name = '';
  address = '';
  nif = '';
  email = '';
  // tslint:disable-next-line: variable-name
  phone_number = '';
  // tslint:disable-next-line: variable-name
  delivery_points = '';
  section: string;

  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService
  ) {
    // this.section = 'orders';
  }

  async ngOnInit(): Promise<any> {
    try {
      const jsonOrgData = await this.peticionesService.getOneOrganizationData(
        this.id
      );
      const data = jsonOrgData.organizationInfo[0];
      // const data = jsonOrgData;
      // console.log('OrganizationHomeComponent -> ngOnInit -> data', data);
      this.name = data.name;
      this.address = data.address;
      this.nif = data.nif;
      this.email = data.email;
      this.phone_number = data.phone_number;
      this.delivery_points = data.delivery_points;
    } catch (error) {
      console.log('OrganizationHomeComponent -> error', error);
    }
  }
  // async getOneOrganization(): Promise<any> {
  //   try {
  //     const jsonOrgData = await this.peticionesService.getOneOrganizationData(
  //       this.id
  //     );
  //     console.log(jsonOrgData.organizationInfo[0]);
  //     const data = jsonOrgData.organizationInfo[0];
  //     const name = data.name;
  //     const address = data.address;
  //     const nif = data.nif;
  //     const email = data.email;
  //     const phone_number = data.phone_number;
  //     const delivery_points = data.delivery_points;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  closeSession(): void {
    this.router.navigate(['/home']);
    sessionStorage.clear();
  }
  loadSection($event): void {
    this.section = $event.target.dataset.section;
  }
}
