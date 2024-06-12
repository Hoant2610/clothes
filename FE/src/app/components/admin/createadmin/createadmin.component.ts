import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent implements OnInit {
  createAdmin : User
  username: any;
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  adminForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private localService: LocalService,
    private fb: FormBuilder
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";

    this.adminForm = this.fb.group({
      username: [],
      password: [],
      email: [],
      address: [],
      telephone: [],
    });

  }

  Confirm() {
    const data = this.adminForm.value
    this.createAdmin = new User(null,data.username,data.password,"admin",data.email,data.address,data.telephone,1);
    this.userService.CreateAdmin(this.createAdmin).subscribe(
      (response) => {
        alert("Tạo mới thành công")
        this.router.navigateByUrl("/manageadmin")
      },
      (error) =>{
        alert("Tên đăng nhập đã tồn tại")
      }
    )
  }

  ngOnInit(): void {
  }

}
