import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080/cart/"

  getAllFromCart(username : any){
    return this.http.get<any>(this.url + username,{headers: this.createAuhtorizationHeader()});
  }

  AddToCart(username : any,idClothes : any,colorValue : any,sizeValue : any,quantity : any){
    const data = {username,idClothes,quantity,colorValue,sizeValue}
    return this.http.post<any>(this.url,data,{headers: this.createAuhtorizationHeader()});
  }

  IncreaseCart(idCart : any){
    return this.http.put<any>(this.url + "increase/" + idCart,{},{headers: this.createAuhtorizationHeader()});
  }

  DecreaseCart(idCart : any){
    return this.http.put<any>(this.url + "decrease/" + idCart,{},{headers: this.createAuhtorizationHeader()});
  }
  
  constructor(private http: HttpClient,
    private localStorage: LocalService) { }

  public createAuhtorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
    }
    return new HttpHeaders();
  }
}
