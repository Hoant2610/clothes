import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  DeleteSize(arg0: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  username: string;
  clothes: Clothes
  idClothes: number
  clothesForm: FormGroup
  numSizes: number[]
  numColors: number[]
  updateClothes : Clothes
  constructor(private clothesService: ClothesService,
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.route.params.subscribe(params => {
      this.idClothes = params['id']; // Lấy giá trị của 'id' từ URL
    });
    this.clothesService.getClothesByIdAdmin(this.idClothes).subscribe(
      (response) => {

        this.clothes = response
        console.log(response)
        this.numSizes = Array.from({ length: this.clothes.sizes.length }, (_, i) => i);
        this.numColors = Array.from({ length: this.clothes.colors.length }, (_, i) => i);

        this.clothesForm.get('name').setValue(this.clothes?.name ?? '');
        this.clothesForm.get('description').setValue(this.clothes?.description ?? '');
        this.clothesForm.get('sold').setValue(this.clothes?.sold ?? '');
        this.clothesForm.get('isEnable').setValue(this.clothes?.isEnable ?? '');
      }
    );
    this.clothesForm = this.fb.group({
      name: [],
      description: [],
      sold: [],
      isEnable: []
    });
  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  Confirm() {
    const data = this.clothesForm.value;
    this.updateClothes = new Clothes(this.idClothes,data.name,data.description,this.clothes.category,this.clothes.sizes,this.clothes.colors,data.sold,data.isEnable);
    this.clothesService.updateClothesById(this.idClothes,this.updateClothes).subscribe(
      (response) => {
        
        if(response!=null){
          window.location.reload();
        }
      },
      (error)=>{
        alert("Tên sản phẩm đã tồn tại!")
      }
    )
    }
}
