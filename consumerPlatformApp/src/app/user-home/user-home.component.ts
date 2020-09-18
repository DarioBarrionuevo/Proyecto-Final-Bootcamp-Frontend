import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticionesBackendService } from '../services/peticiones-backend.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  // maps
  deliveryPointsCoordinates: [object];
  lat: string;
  lon: string;
  // ngIf
  section: string;
  // Organization with Delivery points data
  jsonOrgData: any[];
  //  User data
  jsonUserData: any;
  // Orders data
  ordersData: any[];
  // Table
  dtOptions: any;
  // Sessionstorage data
  userName = JSON.parse(sessionStorage.getItem('user_name'));
  id = JSON.parse(sessionStorage.getItem('_id'));

  constructor(
    private router: Router,
    private peticionesService: PeticionesBackendService
  ) {
    this.ordersData = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Blfrtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
      lengthMenu: [5, 10, 25],
    };
  }

  async ngOnInit(): Promise<any> {
    try {
      // traer info de todas las organizaciones para los delivery
      this.jsonOrgData = await this.peticionesService.getAllOrganizations();
      // console.log('UserHomeComponent -> this.jsonOrgData', this.jsonOrgData);

      // traer info de user

      const jsonUserDataFromBBDD = await this.peticionesService.getOneUser(
        this.id
      );
      this.jsonUserData = jsonUserDataFromBBDD.UserInfo[0];
      // console.log('UserHomeComponent -> this.jsonUserData', this.jsonUserData);

      // Traer array de orders //TODO hacerlo con order by user para las tablas
      const jsonOrdersDataByUser = await this.peticionesService.getOrdersByUser(
        this.id
      );

      this.ordersData = jsonOrdersDataByUser.orderInfo;
      // console.log('this.ordersData', this.ordersData);

      // traer lat y lon from the googleAPI geolocation
      for (const org in this.jsonOrgData) {
        if (this.jsonOrgData.hasOwnProperty(org)) {
          this.jsonOrgData[org].coords = [];
          for (const deliverypoint of this.jsonOrgData[org].delivery_points) {
            const coordinates = await this.peticionesService.getCoordinates(
              deliverypoint
            );
            this.jsonOrgData[org].coords.push(
              coordinates.results[0].geometry.location
            );
            // console.log(
            //   'UserHomeComponent -> coordinates',
            //   this.jsonOrgData[org].coords
            // );
          }
        }
      }

      // console.log('ddddddddddddddddddddddddd', this.jsonOrgData);
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
  goToCheckout(pIdOrg): void {
    console.log('UserHomeComponent -> goToCheckout -> pIdOrg', pIdOrg);
    this.router.navigate([`/userCheckout`, this.id, pIdOrg]); // le paso el segundo parametro que es la id de la organizacion
  }
}
