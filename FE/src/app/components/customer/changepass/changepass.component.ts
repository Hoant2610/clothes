import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  username : string = ""
  user : User 
  passForm : FormGroup
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
      }
    )
    this.passForm = this.fb.group({
      oldPass : ['',Validators.required],
      newPass : ['',Validators.required],
      renewPass : ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  confirm(){
    const data = this.passForm.value
    if (data.newPass != data.renewPass){
      alert("Mật khẩu không trung khớp!")
    }
    else{
      this.user.password = data.oldPass
      this.userService.ChangePass(this.username,data.oldPass,data.newPass).subscribe(
        (response)=>{
          alert(response.response)
          if(response.response == "Đổi mật khẩu thành công!"){
            this.router.navigateByUrl("/customerinfo/" + this.username)
          }
        }
      )
      // this.userService.ChangePass(this.username,data.oldPass,data.newPass)
      
    }
  }
}
