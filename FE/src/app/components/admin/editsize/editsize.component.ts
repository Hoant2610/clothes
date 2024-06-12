import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Size } from 'src/app/entity/size';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-editsize',
  templateUrl: './editsize.component.html',
  styleUrls: ['./editsize.component.css']
})
export class EditsizeComponent implements OnInit {
  username: string;
  size: Size
  clothes: Clothes
  idClothes: number
  idSize: number
  sizeForm: FormGroup
  updateSize: Size

  constructor(private clothesService: ClothesService,
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.route.params.subscribe(params => {
      this.idClothes = params['idClothes']; // Lấy giá trị của 'id' từ URL
      this.idSize = params['idSize']; // Lấy giá trị của 'id' từ URL
    });
    clothesService.getSizeClothesById(this.idClothes, this.idSize).subscribe(
      (response) => {
        this.size = response
        // console.log(this.size)
        this.sizeForm.get('size').setValue(this.size?.size ?? '');
      }
    )
    this.clothesService.getClothesByIdAdmin(this.idClothes).subscribe(
      (response) => {
        this.clothes = response
      }
    );
    this.sizeForm = this.fb.group({
      size: []
    });
  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  Confirm() {
    const data = this.sizeForm.value
    this.updateSize = new Size(this.idSize,data.size)
    this.clothesService.updateSizeClothesById(this.idClothes,this.idSize,this.updateSize).subscribe(
      (respone)=>{
        if(respone!=null){
          window.location.reload();
        }
      },
      (error)=>{
        alert("Kích thước đã tồn tại!")
      }
    )
  }
}
