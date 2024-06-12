import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  Register(data: any) {
    return this.http.post<any>(this.url + "register", data);
  }

  Login(data: any) {
    return this.http.post<any>(this.url + "login", data);
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
