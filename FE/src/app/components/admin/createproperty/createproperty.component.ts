import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Color } from 'src/app/entity/color';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-createproperty',
  templateUrl: './createproperty.component.html',
  styleUrls: ['./createproperty.component.css']
})
export class CreatepropertyComponent implements OnInit {

  @ViewChild('nameColor', { static: false }) nameColor: ElementRef;
deleteColor() {
throw new Error('Method not implemented.');
}
DeleteSize(arg0: number,arg1: number) {
throw new Error('Method not implemented.');
}
  username: string;
  clothes: Clothes
  idClothes: number
  clothesForm: FormGroup
  numSizes : number[]
  numColors : number[]
  colorForm: FormGroup
  colors: any[] = []
  colorData: any[] = [];
  numberOfColors: number;

  constructor(private clothesService: ClothesService,
              private router: Router,
              private localService: LocalService,
              private route: ActivatedRoute,
              private fb: FormBuilder          
            ) {

    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.route.params.subscribe(params => {
      this.idClothes = params['idClothes']; // Lấy giá trị của 'id' từ URL
    });
    this.clothesService.getClothesByIdAdmin(this.idClothes).subscribe(
      (response) => {
        this.clothes = response
        this.numSizes = Array.from({length: this.clothes.sizes.length}, (_, i) => i);
        this.numColors = Array.from({length: this.clothes.colors.length}, (_, i) => i);
        
      }
    );
    this.colorForm = this.fb.group({
      color: ['', Validators.required],
      urlImage: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      originalPrice: ['', Validators.required]
    });
    // this.clothesForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  saveColorData() {
    if(this.colorForm.value.urlImage){
      this.colorForm.value.urlImage = this.colorForm.value.urlImage.substring(12);
    }
    const data = this.colorForm.value
    const colorNew = new Color(null, data.color, data.originalPrice, data.sellingPrice, data.urlImage)
    this.colors.push(colorNew)
    this.colorData.push(this.colorForm.value);
    this.colorForm.reset(); // Reset form sau khi lưu dữ liệu
    this.nameColor.nativeElement.insertAdjacentHTML('afterend', `                
      <table class="table">
        <tbody>
              <tr >
                <td></td>
                <img src="/assets/imgs/${data.urlImage}"/>
                <td>${data.color}</td>
                <td>${data.urlImage}</td>
                <td>${data.sellingPrice}</td>
                <td>${data.originalPrice}</td>
              </tr>
          </tbody>
          <thead class="thead-dark">
          <tr>
            <th>Ảnh</th>
            <th style="min-width: 100px;">Màu</th>
            <th style="min-width: 150px;">URL</th>
            <th style="min-width: 150px;">Giá bán</th>
            <th style="min-width: 150px;">Giá gốc</th>
          </tr>
        </thead>
      </table>
        `
    );
    
  }
  generateColorRows() {
    // Khởi tạo lại mảng số màu
    this.numberOfColors = parseInt(this.numberOfColors.toString()); // Chuyển sang kiểu số nếu không phải
  }
  getIndexes(): number[] {
    return Array(this.numberOfColors).fill(0).map((x, i) => i);
  }

  confirm() {
    this.clothesService.createColor(this.colors,this.idClothes).subscribe(
      (response)=>{
        console.log(response)
        window.location.reload();
      },
      (error)=>{
          alert("Màu đã tồn tại!")
      }
    )
  }


}
