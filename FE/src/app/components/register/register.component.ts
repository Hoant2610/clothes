import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../entity/user';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user : User | undefined ;

  ngOnInit(): void {
  }
  
  constructor(private formBuilder: FormBuilder,
              private jwrService : JwtService,
              private router: Router
    ) {
    this.registrationForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      rePassword: ['',Validators.required],
      // rePassword: [''], // Tên trường đã được thay đổi thành rePassword để phù hợp với HTML
      email: ['',Validators.required]
    });
    
    
  }

  Register() {
      const formData = this.registrationForm.value;
      if(formData.password != formData.rePassword){
        alert("Mật khẩu không trung khớp!")
      }
      else{
        this.jwrService.Register(formData).subscribe(
          (response) => {
            if (response.id != null) {
              console.log(response)
              this.router.navigateByUrl("/customerhome")
            }
          }
        );
      }
  }
}
