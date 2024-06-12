import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admindetail',
  templateUrl: './admindetail.component.html',
  styleUrls: ['./admindetail.component.css']
})
export class AdmindetailComponent implements OnInit {
  updateAdmin : User | undefined;
  admin : User | undefined;
  username : string;
  idAdmin : number = 0;

  emailValue: any;
  adminForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private localService : LocalService,
    private fb: FormBuilder) { 
      const tmp = localService.GetLocalStorage("username");
      this.username = tmp || "";
      this.route.params.subscribe(params => {
        this.idAdmin = params['id']; // Lấy giá trị của 'id' từ URL
        console.log(this.idAdmin)
      });
      this.userService.GetAdminById(this.idAdmin).subscribe(
        (response) =>{
                        this.admin = response;
                        // console.log(this.admin)
                        this.adminForm.get('email').setValue(this.admin?.email ?? '');
                        this.adminForm.get('telephone').setValue(this.admin?.telephone ?? '');
                        this.adminForm.get('address').setValue(this.admin?.address ?? '');
                        this.adminForm.get('isEnable').setValue(this.admin?.isEnable ?? '');
                        
        }
      );
      this.adminForm = this.fb.group({
        email : [],
        address : [],
        telephone : [],
        isEnable : []
      });
    }

    Logout() {
      localStorage.clear();
      this.router.navigateByUrl("/home");
    }
    Confirm() {
      const data = this.adminForm.value;
      this.updateAdmin = new User(this.admin?.id,this.admin?.username,this.admin?.password,this.admin?.role,data.email,data.address,data.telephone,data.isEnable)
      console.log(this.updateAdmin)
      
      this.userService.UpdateAdminById(this.updateAdmin.id,this.updateAdmin).subscribe(
        (response) => {
          if(response!=null){
            window.location.reload();
          }
        }
      )
      }
  ngOnInit(): void {
  }

}
