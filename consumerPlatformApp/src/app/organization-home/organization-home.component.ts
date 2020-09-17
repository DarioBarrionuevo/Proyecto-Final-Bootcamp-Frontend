import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css'],
})
export class OrganizationHomeComponent implements OnInit {
  // Add delivery point
  formDelivery: FormGroup;
  // Orders data
  ordersData: any[];
  // Delivery points data
  deliveryPointsData: any[];
  dtOptions: any;
  // Sessionstorage data
  userName = JSON.parse(sessionStorage.getItem('user_name'));
  id = JSON.parse(sessionStorage.getItem('_id'));

  // Organization data
  organizationData: any;

  // ngIf
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
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
    };

    this.formDelivery = new FormGroup({
      delivery_points: new FormControl(),
    });
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

  closeSession(): void {
    this.router.navigate(['/home']);
    sessionStorage.clear();
  }
  loadSection($event): void {
    this.section = $event.target.dataset.section;
  }
  async addDeliveryPoint(): Promise<any> {
    try {
      const deliveryData = this.formDelivery.value;
      const jsonCreateOrganization = await this.peticionesService.addDeliveryPointToBBDD(
        this.id,
        deliveryData
      );
      console.log(
        'OrganizationHomeComponent -> jsonCreateOrganization',
        jsonCreateOrganization
      );
      console.log('OrganizationHomeComponent -> deliveryData', deliveryData);

      this.formDelivery.reset();
      this.deliveryPointsData.push(deliveryData);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDeliveryPoint(pIndex): Promise<any> {
    try {
      const jsonOrgData = await this.peticionesService.deleteDeliveryPointFromBBDD(
        this.id,
        pIndex
      );
      this.deliveryPointsData.splice(pIndex, 1);
    } catch (error) {
      console.log(error);
    }
  }
}
