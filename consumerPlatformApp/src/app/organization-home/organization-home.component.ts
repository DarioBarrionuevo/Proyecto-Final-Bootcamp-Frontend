import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css'],
})
export class OrganizationHomeComponent implements OnInit {
  // Orders data
  ordersData: any[];
  deliveryPointsData: any[];
  dtOptions: any;
  // Sessionstorage data
  userName = JSON.parse(sessionStorage.getItem('user_name'));
  id = JSON.parse(sessionStorage.getItem('_id'));

  // Organization data
  organizationData: any;

  section: string;

  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService
  ) {
    this.ordersData = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
    };
  }

  async ngOnInit(): Promise<any> {
    try {
      // traer info de organizacion
      const jsonOrgData = await this.peticionesService.getOneOrganizationData(
        this.id
      );
      this.organizationData = jsonOrgData.organizationInfo[0];
      this.deliveryPointsData = this.organizationData.delivery_points;
      // console.log(
      //   'OrganizationHomeComponent -> this.organizationData',
      //   this.deliveryPointsData
      // );

      // Traer array de orders
      const jsonOrdersDataByOrg = await this.peticionesService.getOrdersByOrganization(
        this.id
      );
      this.ordersData = jsonOrdersDataByOrg.orderInfo;
      // console.log('this.ordersData', this.ordersData);
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
