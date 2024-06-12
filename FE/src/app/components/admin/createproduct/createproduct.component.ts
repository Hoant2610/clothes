import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { Clothes } from 'src/app/entity/clothes';
import { Color } from 'src/app/entity/color';
import { Size } from 'src/app/entity/size';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  @ViewChild('nameColor', { static: false }) nameColor: ElementRef;
  @ViewChild('nameSize', { static: false }) nameSize: ElementRef;

  username: string;
  clothesForm: FormGroup
  colorForm: FormGroup
  sizeForm: FormGroup
  categories: Category[]
  categoryclothes: Category
  clothesCreate: Clothes
  colors: any[] = []
  sizes: any[] = []
  numberOfColors: number;
  numberOfSizes: number;
  colorData: any[] = [];
  sizeData: any[] = [];

  constructor(private clothesService: ClothesService,
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.clothesService.getListCategory().subscribe(
      (response) => {
        this.categories = response
      }
    )
    this.clothesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryname: ['', Validators.required]
    });
    this.colorForm = this.fb.group({
      color: ['', Validators.required],
      urlImage: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      originalPrice: ['', Validators.required]
    });
    this.sizeForm = this.fb.group({
      size: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  Confirm() {
    const data = this.clothesForm.value
    this.categoryclothes = this.categories.find(category => category.name === data.categoryname);
    if (!data.name || !data.description || !this.categoryclothes || this.sizes.length==0 || this.colors.length==0) {
      alert("Vui lòng điền đầy đủ!")
    } else {
      this.clothesCreate = new Clothes(null, data.name, data.description, this.categoryclothes, this.sizes, this.colors, 0, 1);
    }
    this.clothesService.createClothes(this.clothesCreate).subscribe(
      (response)=>{
        if(response != null)
          this.router.navigateByUrl("/manageproduct");
      }
    )
    console.log(this.clothesCreate)
  }

  generateColorRows() {
    // Khởi tạo lại mảng số màu
    this.numberOfColors = parseInt(this.numberOfColors.toString()); // Chuyển sang kiểu số nếu không phải
  }
  getIndexes(): number[] {
    return Array(this.numberOfColors).fill(0).map((x, i) => i);
  }
  generateSizeRows() {
    // Khởi tạo lại mảng số màu
    this.numberOfSizes = parseInt(this.numberOfSizes.toString()); // Chuyển sang kiểu số nếu không phải
  }
  getIndexesSize(): number[] {
    return Array(this.numberOfSizes).fill(0).map((x, i) => i);
  }

  saveColorData() {
    this.colorForm.value.urlImage = this.colorForm.value.urlImage.substring(12);
    const data = this.colorForm.value
    const colorNew = new Color(null, data.color, data.originalPrice, data.sellingPrice, data.urlImage)
    this.colors.push(colorNew)
    this.colorData.push(this.colorForm.value);
    this.colorForm.reset(); // Reset form sau khi lưu dữ liệu
    this.nameColor.nativeElement.insertAdjacentHTML('afterend', `                
      <table>
        <tbody>
              <tr >
                <img height="200px" src="/assets/imgs/${data.urlImage}"/>
                <td>${data.color}</td>
                <td>${data.urlImage}</td>
                <td>${data.sellingPrice}</td>
                <td>${data.originalPrice}</td>
              </tr>
          </tbody>
          <thead>
          <tr>
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
  saveSizeData() {
    const data = this.sizeForm.value
    const sizeNew = new Size(null, data.size)
    this.sizes.push(sizeNew)
    this.sizeData.push(this.sizeForm.value);
    this.sizeForm.reset(); // Reset form sau khi lưu dữ liệu
    this.nameSize.nativeElement.insertAdjacentHTML('afterend', `                
      </thead>
      <tbody>
            <tr >
              <td>${data.size}</td>
            </tr>
        </tbody>`
    );
  }
}