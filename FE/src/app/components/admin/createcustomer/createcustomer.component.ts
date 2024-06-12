import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {
  createCustomer : User
  username: any;
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  customerForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private localService: LocalService,
    private fb: FormBuilder
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";

    this.customerForm = this.fb.group({
      username: [],
      password: [],
      email: [],
      address: [],
      telephone: [],
    });

  }

  Confirm() {
    const data = this.customerForm.value
    this.createCustomer = new User(null,data.username,data.password,"customer",data.email,data.address,data.telephone,1);
    this.userService.CreateCustomer(this.createCustomer).subscribe(
      (response) => {
        alert("Tạo mới thành công")
        this.router.navigateByUrl("/managecustomer")
      },
      (error) =>{
        alert("Tên đăng nhập đã tồn tại")
      }
    )
  }

  ngOnInit(): void {
  }

}
