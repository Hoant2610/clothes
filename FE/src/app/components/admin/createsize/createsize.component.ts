import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Size } from 'src/app/entity/size';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-createsize',
  templateUrl: './createsize.component.html',
  styleUrls: ['./createsize.component.css']
})
export class CreatesizeComponent implements OnInit {
  @ViewChild('nameSize', { static: false }) nameColor: ElementRef;
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
  sizeForm: FormGroup
  sizes: any[] = []
  sizeData: any[] = [];
  numberOfSizes: number;
  
  constructor(
    private clothesService: ClothesService,
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
    this.sizeForm = this.fb.group({
      size: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  saveSizeData() {
    if(this.sizeForm.value.urlImage){
      this.sizeForm.value.urlImage = this.sizeForm.value.urlImage.substring(12);
    }
    const data = this.sizeForm.value
    const sizeNew = new Size(null, data.size)
    this.sizes.push(sizeNew)
    this.sizeData.push(this.sizeForm.value);
    this.sizeForm.reset(); // Reset form sau khi lưu dữ liệu
    this.nameColor.nativeElement.insertAdjacentHTML('afterend', `                
      <table class="table">
        <tbody>
              <tr >
              <td>${data.size}</td>
              </tr>
          </tbody>
          <thead class="thead-dark">
          <tr>
            <th>Kích thước</th>
          </tr>
        </thead>
      </table>
        `
    );
    
  }

  generateColorRows() {
    // Khởi tạo lại mảng số màu
    this.numberOfSizes = parseInt(this.numberOfSizes.toString()); // Chuyển sang kiểu số nếu không phải
  }
  getIndexes(): number[] {
    return Array(this.numberOfSizes).fill(0).map((x, i) => i);
  }

  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  confirm() {
    this.clothesService.createSize(this.sizes,this.idClothes).subscribe(
      (response)=>{
        console.log(response)
        window.location.reload();
      },
      (error)=>{
          alert("Kích thước đã tồn tại!")
      }
    )
  }
}
