import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeticionesBackendService {
  token = JSON.parse(sessionStorage.getItem('token'));
  constructor(private httpClient: HttpClient) {}

  createUser(pUserData): any {
    fetch('http://localhost:3000/users/createUser', {
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
    fetch('http://localhost:3000/organizations/createOrganization', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(pOrgData),
      headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/x-www-form-urlencoded',
      },
    })
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
        'http://localhost:3000/organizations/login',
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
        'http://localhost:3000/users/login',
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
        `http://localhost:3000/organizations/getOneOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  getOrdersByOrganization(pId): Promise<any> {
    const httpHeaders = {
      headers: {
        'x-access-token': this.token,
      },
    };

    return this.httpClient
      .get<any>(
        `http://localhost:3000/orders/getOrdersByOrganization/${pId}`,
        httpHeaders
      )
      .toPromise();
  }
  addDeliveryPointToBBDD(pId, pDeliveryPoint): any {
    fetch(`http://localhost:3000/organizations/addDeliveryPoint/${pId}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(pDeliveryPoint),
      headers: {
        'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
  deleteDeliveryPointFromBBDD(pId, pIndex): any {
    console.log('deleteDeliveryPointFromBBDD -> pIndex', pIndex);
    console.log('deleteDeliveryPointFromBBDD -> pId', pId);

    fetch(`http://localhost:3000/organizations/deleteDeliveryPoint/${pId}`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify({ index: pIndex }),
      headers: {
        'Content-Type': 'application/json', // Important!! is a exception,depends on the headers even when comes from form-urlencoded
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log('RESPONSE', json);
        return json;
      });
  }
}
