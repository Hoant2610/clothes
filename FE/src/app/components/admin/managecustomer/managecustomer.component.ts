import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-managecustomer',
  templateUrl: './managecustomer.component.html',
  styleUrls: ['./managecustomer.component.css']
})
export class ManagecustomerComponent implements OnInit {
  username: string;
  customers: User[] = [];
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private localService: LocalService
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.userService.GetAllCustomer().subscribe((data: User[]) => {
      this.customers = data;
    });
  }

  ngOnInit(): void {
  }

}
