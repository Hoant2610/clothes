import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { JwtService } from 'src/app/services/jwt.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  username : string;
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  admin : User | undefined;
  users : User[] = [];

  constructor(
    private userService: UserService,
              private router: Router,
              private localService : LocalService
  ) { 
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
  }

  ngOnInit(): void {
  }

}
