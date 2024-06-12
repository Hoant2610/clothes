import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.css']
})
export class CustomerinfoComponent implements OnInit {
  username : string = ""
  user : User 
  customerForm: FormGroup;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private localService : LocalService,
    private fb : FormBuilder
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.userService.GetCustomerByUsername(this.username).subscribe(
      (response)=>{
        this.user = response
        // console.log(this.user)
        this.customerForm.get('email').setValue(this.user.email)
        this.customerForm.get('telephone').setValue(this.user.telephone)
        this.customerForm.get('address').setValue(this.user.address)
      }
    )
    this.customerForm = this.fb.group({
      email : [],
      telephone : [],
      address : []
    })
   }
   
  ngOnInit(): void {
  }
  confirm(){
    const data = this.customerForm.value
    this.user.address = data.address
    this.user.telephone = data.telephone
    this.user.email = data.email
    this.userService.UpdateCustomerByUsername(this.username,this.user).subscribe(
      (response)=>{
        window.location.reload();
      }
    )
  }
}
