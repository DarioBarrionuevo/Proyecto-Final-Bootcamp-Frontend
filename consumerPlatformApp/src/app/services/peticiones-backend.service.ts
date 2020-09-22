import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeticionesBackendService {
  token = JSON.parse(sessionStorage.getItem('token'));
  constructor(private httpClient: HttpClient) {}

  createUser(pUserData): any {
    fetch('https://basket-consumer-platform.herokuapp.com/users/createUser', {
      // fetch('http://localhost:3000/users/createUser', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(pUserData),
      headers: {
        'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
        // Accept: 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
  createOrganization(pOrgData): any {
    fetch(
      'https://basket-consumer-platform.herokuapp.com/organizations/createOrganization',
      {
        // fetch('http://localhost:3000/organizations/createOrganization', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(pOrgData),
        headers: {
          'Content-Type': 'application/json',
          // Accept: 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
  organizationLogin(pOrgData): Promise<any> {
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.httpClient
      .post<any>(
        'https://basket-consumer-platform.herokuapp.com/organizations/login',

        // 'http://localhost:3000/organizations/login',
        JSON.stringify(pOrgData),
        httpHeaders
      )
      .toPromise();
  }
  userLogin(pUserData): Promise<any> {
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.httpClient
      .post<any>(
        'https://basket-consumer-platform.herokuapp.com/users/login',

        // 'http://localhost:3000/users/login',
        JSON.stringify(pUserData),
        httpHeaders
      )
      .toPromise();
  }
  getOneOrganizationData(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `https://basket-consumer-platform.herokuapp.com/organizations/getOneOrganization/${pId}`,

        // `http://localhost:3000/organizations/getOneOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  getOneUser(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return (
      this.httpClient
        .get<any>(
          `https://basket-consumer-platform.herokuapp.com/users/getOneUser/${pId}`,
          httpHeaders
        )

        // .get<any>(`http://localhost:3000/users/getOneUser/${pId}`, httpHeaders)
        .toPromise()
    );
  }
  getAllOrganizations(): Promise<any> {
    return (
      this.httpClient
        .get<any>(
          `https://basket-consumer-platform.herokuapp.com/organizations/getAllOrganizations`
        )

        // .get<any>(`http://localhost:3000/organizations/getAllOrganizations`)
        .toPromise()
    );
  }
  getAllUsers(): Promise<any> {
    return (
      this.httpClient
        .get<any>(
          `https://basket-consumer-platform.herokuapp.com/users/getAllUsers`
        )

        // .get<any>(`http://localhost:3000/users/getAllUsers`)
        .toPromise()
    );
  }
  getOrdersByOrganization(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `https://basket-consumer-platform.herokuapp.com/orders/getOrdersByOrganization/${pId}`,

        // `http://localhost:3000/orders/getOrdersByOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  getOrdersByUser(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `https://basket-consumer-platform.herokuapp.com/orders/getOrdersByUser/${pId}`,

        // `http://localhost:3000/orders/getOrdersByUser/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  addDeliveryPointToBBDD(pId, pDeliveryPoint): any {
    fetch(
      `https://basket-consumer-platform.herokuapp.com/organizations/addDeliveryPoint/${pId}`,
      {
        // fetch(`http://localhost:3000/organizations/addDeliveryPoint/${pId}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(pDeliveryPoint),
        headers: {
          'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
  deleteDeliveryPointFromBBDD(pId, pIndex): any {
    // console.log('deleteDeliveryPointFromBBDD -> pIndex', pIndex);
    // console.log('deleteDeliveryPointFromBBDD -> pId', pId);

    fetch(
      `https://basket-consumer-platform.herokuapp.com/organizations/deleteDeliveryPoint/${pId}`,
      {
        // fetch(`http://localhost:3000/organizations/deleteDeliveryPoint/${pId}`, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify({ index: pIndex }),
        headers: {
          'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
  createBasket(pBasketData): any {
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .post<any>(
        'https://basket-consumer-platform.herokuapp.com/baskets/createBasket',

        // 'http://localhost:3000/baskets/createBasket',
        JSON.stringify(pBasketData),
        httpHeaders
      )
      .toPromise();
  }
  getBasketsByOrganization(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `https://basket-consumer-platform.herokuapp.com/baskets/getBasketsByOrganization/${pId}`,

        // `http://localhost:3000/baskets/getBasketsByOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  getBasketsActiveByOrganization(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `https://basket-consumer-platform.herokuapp.com/baskets/getBasketsActiveByOrganization/${pId}`,

        // `http://localhost:3000/baskets/getBasketsActiveByOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  getCoordinates(pStreetName): Promise<any> {
    return this.httpClient
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBP4AqgTC6EPZ8HMKMgmvUOxKlkHgigB54&address=${pStreetName}`
      )
      .toPromise();
  }
  createOrder(pOrderData): any {
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .post<any>(
        'https://basket-consumer-platform.herokuapp.com/orders/createOrder',

        // 'http://localhost:3000/orders/createOrder',
        JSON.stringify(pOrderData),
        httpHeaders
      )
      .toPromise();
  }
  sendEmail(pInfo): any {
    const httpHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .post<any>(
        'https://basket-consumer-platform.herokuapp.com/email/sendEmail',

        // 'http://localhost:3000/email/sendEmail',
        JSON.stringify(pInfo),
        httpHeaders
      )
      .toPromise();
  }
}
