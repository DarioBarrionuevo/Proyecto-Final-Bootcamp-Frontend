import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticionesBackendService } from '../services/peticiones-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css'],
})
export class OrganizationHomeComponent implements OnInit {
  // Add basket
  formBasket: FormGroup;
  // Add delivery point
  formDelivery: FormGroup;
  // Orders data
  ordersData: any[];
  // Baskets data
  basketsData: any[];

  // Delivery points data
  deliveryPointsData: any[];
  // Table
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
    private peticionesService: PeticionesBackendService,
    private toastr: ToastrService
  ) {
    this.ordersData = [];
    this.basketsData = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      dom: 'Blfrtip',
      buttons: ['copy', 'csv', 'excel', 'print'],
    };

    this.formDelivery = new FormGroup({
      delivery_points: new FormControl('', [Validators.required]),
    });
    this.formBasket = new FormGroup({
      format: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  async ngOnInit(): Promise<any> {
    try {
      // Bring organization info
      const jsonOrgData = await this.peticionesService.getOneOrganizationData(
        this.id
      );
      this.organizationData = jsonOrgData.organizationInfo[0];

      this.deliveryPointsData = this.organizationData.delivery_points;

      // Bring orders array
      const jsonOrdersDataByOrg = await this.peticionesService.getOrdersByOrganization(
        this.id
      );
      this.ordersData = jsonOrdersDataByOrg.orderInfo;

      // Bring baskets array
      const jsonBasketsDataByOrg = await this.peticionesService.getBasketsByOrganization(
        this.id
      );
      this.basketsData = jsonBasketsDataByOrg.basketInfo;
      // console.log('OrganizationHomeComponent -> basketsData', this.basketsData);
    } catch (error) {
      console.log('OrganizationHomeComponent -> error', error);
    }
  }

  async addDeliveryPoint(): Promise<any> {
    try {
      const deliveryData = this.formDelivery.value;
      const jsonCreateOrganization = await this.peticionesService.addDeliveryPointToBBDD(
        this.id,
        deliveryData
      );

      this.deliveryPointsData.push(deliveryData.delivery_points); // hago el push

      this.toastr.info('Punto de recogida añadido correctamente!');

      this.formDelivery.reset();
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

      this.toastr.info('Punto de recogida borrado correctamente!');

      this.deliveryPointsData.splice(pIndex, 1);
    } catch (error) {
      console.log(error);
    }
  }

  async createBasket(): Promise<any> {
    try {
      const basketData = this.formBasket.value;
      basketData.organization = this.id;
      basketData._id = this.id;
      // console.log('FormsComponent -> addUserToBBDD -> basketData', basketData);

      const jsonCreateBasket = this.peticionesService.createBasket(basketData);
      // console.log('Basket Created ');

      // TODO hacer el push para que se actualice la tabla en tiempo real ,como hago el push?

      this.formBasket.reset();
      this.toastr.info('Cesta creada correctamente!');
    } catch (error) {
      console.log(error);
    }
  }

  closeSession(): void {
    this.router.navigate(['/home']);
    sessionStorage.clear();
  }
  loadSection($event): void {
    this.section = $event.target.dataset.section;
  }
}
