import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  GetLocalStorage(name : any){
    return localStorage.getItem(name);
  }
}
