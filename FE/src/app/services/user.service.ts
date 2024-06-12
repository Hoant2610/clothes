import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from './local.service';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/admin/';
  private urlCustomer = 'http://localhost:8080/customer/';
  ChangePass(username : any,oldPass : any,newPass : any){
    const data = {
      oldPassword : oldPass,
      newPassword : newPass
    }
    return this.http.put<any>(this.urlCustomer +"changePass/" +username,data,{headers : this.createAuhtorizationHeader()})
  }
  GetAllCustomer() {
    return this.http.get<any>(this.url + "getallcustomer", {headers: this.createAuhtorizationHeader()
    });
  }
  GetCustomerById(id: number) {
    return this.http.get<any>(this.url + "getallcustomer/" + id, {headers: this.createAuhtorizationHeader()
    });
  }
  GetCustomerByUsername(username: string) {
    return this.http.get<any>(this.urlCustomer + username, {headers: this.createAuhtorizationHeader()
    });
  }
  UpdateCustomerById(id: number, customer: any) {
    return this.http.put<any>(this.url + "getallcustomer/" + id, customer, {headers: this.createAuhtorizationHeader()
    });
  }
  UpdateCustomerByUsername(username : any, customer: any) {
    return this.http.put<any>(this.urlCustomer  + username, customer, {headers: this.createAuhtorizationHeader()
    });
  }
  CreateCustomer(customer: any) {
    return this.http.post<any>(this.url + "getallcustomer", customer, {headers: this.createAuhtorizationHeader()
    });
  }

  GetAllAdmin() {
    return this.http.get<any>(this.url + "getalladmin", {headers: this.createAuhtorizationHeader()
    });
  }
  GetAdminById(id: number) {
    return this.http.get<any>(this.url + "getalladmin/" + id, {headers: this.createAuhtorizationHeader()
    });
  }
  UpdateAdminById(id: number, customer: any) {
    return this.http.put<any>(this.url + "getalladmin/" + id, customer, {headers: this.createAuhtorizationHeader()
    });
  }
  CreateAdmin(customer: any) {
    return this.http.post<any>(this.url + "getalladmin", customer, { headers: this.createAuhtorizationHeader()
    });
  }

  constructor(private http: HttpClient,
    private localStorage: LocalService) {

  }
  public createAuhtorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }

}
