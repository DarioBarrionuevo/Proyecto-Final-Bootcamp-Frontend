import { Component, OnInit } from '@angular/core';
import { PeticionesBackendService } from '../services/peticiones-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css'],
})
export class UserCheckoutComponent implements OnInit {
  //  User data
  jsonUserData: any;
  // Data from userHome (delivery point, organization)
  deliveryPointInfo: string;
  organizationId: string;
  organizationName: string;
  // Sessionstorage data
  userName = JSON.parse(sessionStorage.getItem('user_name'));
  id = JSON.parse(sessionStorage.getItem('_id'));
  // Table
  dtOptions: any;
  // Baskets data
  basketsData: any[];
  // ngIf
  section: string;
  // Checkout  form
  formCheckout: FormGroup;
  // Create order
  orderData: any;
  // Organization data
  organizationData: any;
  organizationEmail: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private peticionesService: PeticionesBackendService,
    private toastr: ToastrService
  ) {
    this.basketsData = [];
    // Checkout form
    this.formCheckout = new FormGroup({
      numberOfBasket: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
    });
    // create order
    this.orderData = {};
  }

  async ngOnInit(): Promise<any> {
    try {
      // DataTable options
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        processing: true,
        dom: 'Blfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
      };
      // Get data from url
      this.activateRoute.params.subscribe((params) => {
        this.deliveryPointInfo = params.deliveryPoint;
        this.organizationId = params.idOrg;
        this.organizationName = params.orgName;
        // parmas.id or params.idorg
      });

      // Bring active baskets data
      const jsonBasketsDataByOrg = await this.peticionesService.getBasketsActiveByOrganization(
        this.organizationId
      );
      this.basketsData = jsonBasketsDataByOrg.basketInfo;

      // Bring info user

      const jsonUserDataFromBBDD = await this.peticionesService.getOneUser(
        this.id
      );
      this.jsonUserData = jsonUserDataFromBBDD.UserInfo[0];

      // Bring info organization
      const jsonOrgData = await this.peticionesService.getOneOrganizationData(
        this.organizationId
      );
      this.organizationEmail = jsonOrgData.organizationInfo[0].email;
      this.organizationName = jsonOrgData.organizationInfo[0].name;
    } catch (error) {
      console.log('UserCheckoutComponent -> ngOnInit -> error', error);
    }
  }

  closeSession(): void {
    this.router.navigate(['/home']);
    sessionStorage.clear();
  }
  goBack(): void {
    this.router.navigate([`/userHome`, this.id]); // Second param is the organization id
  }
  loadSection($event): void {
    this.section = $event.target.dataset.section;
  }

  async checkout(): Promise<any> {
    try {
      // Create object with info
      const checkoutData = this.formCheckout.value;
      // Create order

      this.orderData._id = this.id;
      this.orderData.organization = this.organizationId;
      this.orderData.basket = this.basketsData[
        checkoutData.numberOfBasket - 1
      ]._id;
      this.orderData.user = this.id;

      const jsonCreateORder = await this.peticionesService.createOrder(
        this.orderData
      );
      // Keep with the object
      checkoutData.deliveryPoint = this.deliveryPointInfo;
      checkoutData.name = this.jsonUserData.name;
      checkoutData.surname1 = this.jsonUserData.surname1;
      checkoutData.surname2 = this.jsonUserData.surname2;
      checkoutData.email = this.jsonUserData.email;
      checkoutData.phone_number = this.jsonUserData.phone_number;
      checkoutData.basket = this.basketsData[checkoutData.numberOfBasket - 1];
      checkoutData.organization_email = this.organizationEmail;
      checkoutData.organization_name = this.organizationName;
      // console.log('UserCheckoutComponent -> checkoutData', checkoutData);

      // Sending email
      const jsonSendEmail = await this.peticionesService.sendEmail(
        checkoutData
      );
      this.toastr.info('Pedido realizado correctamente!');

      this.formCheckout.reset();
      // this.router.navigate([`/userHome/${this.id}`]);
    } catch (error) {
      console.log('UserCheckoutComponent -> error', error);
    }
  }
}
