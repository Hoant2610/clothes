import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clothes } from '../entity/clothes';
import { Color } from '../entity/color';
import { Size } from '../entity/size';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  
  private homeUrl =   'http://localhost:8080/home/list';
  private adminUrl = 'http://localhost:8080/admin'
  constructor(private http: HttpClient) { }


  getListClothesHome(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString()) // Thêm tham số page vào URL
      .set('size', size.toString()); // Thêm tham số size vào URL
    return this.http.get<any>(this.homeUrl, { params });
  }
  getListClothesAdmin(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString()) // Thêm tham số page vào URL
      .set('size', size.toString()); // Thêm tham số size vào URL
    return this.http.get<any>(this.adminUrl +"/listclothes", { params, headers :this.createAuhtorizationHeader()});
  }
  getClothesByNameHome(nameClothes : any){
    return this.http.get<any>(this.homeUrl +"/"+nameClothes);
  }


  getListCategory(){
    return this.http.get<any>(this.adminUrl +"/categories" ,{headers :this.createAuhtorizationHeader()} );
  }
  getClothesByIdAdmin(id : number){
    return this.http.get<any>(this.adminUrl +"/listclothes/"+id,{headers :this.createAuhtorizationHeader()});
  }
  getColorClothesById(idClothes: number,idColor : number){
    return this.http.get<any>(this.adminUrl +"/color/"+idClothes+"/"+idColor,{headers :this.createAuhtorizationHeader()} );
  }
  getSizeClothesById(idClothes: number,idSize : number){
    return this.http.get<any>(this.adminUrl +"/size/"+idClothes+"/"+idSize,{headers :this.createAuhtorizationHeader()} );
  }

  updateClothesById(id:any,clothes : any){
    return this.http.put<any>(this.adminUrl + "/listclothes/" + id,clothes,{headers :this.createAuhtorizationHeader()});
  }
  updateColorClothesById(idClothes: number,idColor : number,color : Color){
    return this.http.put<any>(this.adminUrl +"/color/"+idClothes+"/"+idColor,color,{headers :this.createAuhtorizationHeader()} );
  }
  updateSizeClothesById(idClothes: number,idSize : number,size : Size){
    return this.http.put<any>(this.adminUrl +"/size/"+idClothes+"/"+idSize,size,{headers :this.createAuhtorizationHeader()} );
  }
  createClothes(clothes : any){
    return this.http.post<any>(this.adminUrl + "/createclothes",clothes,{headers :this.createAuhtorizationHeader()})
  }
  createColor(colors : any,idClothes : any){
    return this.http.post<any>(this.adminUrl + "/createcolor/"+idClothes,colors,{headers :this.createAuhtorizationHeader()})
  }
  createSize(sizes : any,idClothes : any){
    return this.http.post<any>(this.adminUrl + "/createsize/"+idClothes,sizes,{headers :this.createAuhtorizationHeader()})
  }

  public createAuhtorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      // console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      // console.log("JWT token not found in local storage");
    }
    return new HttpHeaders();
  }
}
