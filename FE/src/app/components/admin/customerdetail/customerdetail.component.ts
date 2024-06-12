import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent implements OnInit {
  updateCustomer : User | undefined;
  customer : User | undefined;
  username : string;
  idCustomer : number = 0;

  emailValue: any;
  customerForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private localService : LocalService,
              private fb: FormBuilder
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.route.params.subscribe(params => {
      this.idCustomer = params['id']; // Lấy giá trị của 'id' từ URL
      console.log(this.idCustomer)
    });
    this.userService.GetCustomerById(this.idCustomer).subscribe(
      (response) =>{
                      this.customer = response;
                      // console.log(this.customer)
                      this.customerForm.get('email').setValue(this.customer?.email ?? '');
                      this.customerForm.get('telephone').setValue(this.customer?.telephone ?? '');
                      this.customerForm.get('address').setValue(this.customer?.address ?? '');
                      this.customerForm.get('isEnable').setValue(this.customer?.isEnable ?? '');
                      
      }
    );
    this.customerForm = this.fb.group({
      email : [],
      address : [],
      telephone : [],
      isEnable : []
    });

  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  Confirm() {
    const data = this.customerForm.value;
    this.updateCustomer = new User(this.customer?.id,this.customer?.username,this.customer?.password,this.customer?.role,data.email,data.address,data.telephone,data.isEnable)
    console.log(this.updateCustomer)
    
    this.userService.UpdateCustomerById(this.updateCustomer.id,this.updateCustomer).subscribe(
      (response) => {
        if(response!=null){
          window.location.reload();
        }
      }
    )
    }
}
