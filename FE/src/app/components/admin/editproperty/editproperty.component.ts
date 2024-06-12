import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Color } from 'src/app/entity/color';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-editproperty',
  templateUrl: './editproperty.component.html',
  styleUrls: ['./editproperty.component.css']
})
export class EditpropertyComponent implements OnInit {
  username: string;
  color: Color
  clothes: Clothes
  idClothes: number
  idColor: number
  colorForm  : FormGroup
  updateColor : Color
  constructor(    private clothesService: ClothesService,
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      const tmp = localService.GetLocalStorage("username");
      this.username = tmp || "";
      this.route.params.subscribe(params => {
        this.idClothes = params['idClothes']; // Lấy giá trị của 'id' từ URL
        this.idColor = params['idColor']; // Lấy giá trị của 'id' từ URL
      });

      clothesService.getColorClothesById(this.idClothes,this.idColor).subscribe(
        (response) =>{
          this.color = response
          console.log(this.color)
          this.colorForm.get('color').setValue(this.color?.color ?? '');
          this.colorForm.get('urlImage').setValue("/assets/imgs/" +this.color?.urlImage ?? '');
          this.colorForm.get('sellingPrice').setValue(this.color?.sellingPrice ?? '');
          this.colorForm.get('originalPrice').setValue(this.color?.originalPrice ?? '');
        }
      )
      this.clothesService.getClothesByIdAdmin(this.idClothes).subscribe(
        (response) => {
          this.clothes = response          
        }
      );
      this.colorForm = this.fb.group({
        color: [],
        urlImage: [],
        sellingPrice: [],
        originalPrice: []
      });
     }

  ngOnInit( ): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Đặt URL của ảnh vào trường urlImage trong form
      this.colorForm.get('urlImage').setValue(e.target.result);
    };

    reader.readAsDataURL(file);
  }
  Confirm() {
    const data = this.colorForm.value
    this.updateColor = new Color(this.idColor,data.color,data.originalPrice,data.sellingPrice,data.urlImage.substring(13))
    this.clothesService.updateColorClothesById(this.idClothes,this.idColor,this.updateColor).subscribe(
      (respone)=>{
        if(respone!=null){
          window.location.reload();
        }
      },
      (error)=>{
        alert("Màu sắc đã tồn tại!")
      }
    )
  }
}
