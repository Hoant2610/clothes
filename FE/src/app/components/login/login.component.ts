import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entity/user';
import { JwtService } from 'src/app/services/jwt.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup  ;

    ngOnInit(): void {   }

  constructor(private jwrService : JwtService,
              private fb : FormBuilder,
              private router : Router
    ){
      this.loginForm = this.fb.group({
        username : ['',Validators.required],
        password : ['',Validators.required]
      })
    }


  Login() {
    const data = this.loginForm.value;
    this.jwrService.Login(data).subscribe(
      (response) => {
        if(response.jwtToken != null){
          localStorage.setItem('jwt',response.jwtToken)
          if(response.role == "customer" && response.isEnable == 1){
            localStorage.setItem('username',response.username)
            this.router.navigateByUrl("/customerhome")
          }
          else if(response.role == "admin" && response.isEnable == 1){
            localStorage.setItem('username',response.username)
            this.router.navigateByUrl("/adminhome")
          } 
          else{
            alert("Tài khoản của bạn bị vô hiệu hóa")
          }
        }
      },
      (error) => {
        // Xử lý lỗi nếu có
        alert("Sai tên đăng nhập hoặc mật khẩu")
        // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác tùy thuộc vào loại lỗi
      }
    )
 }
}