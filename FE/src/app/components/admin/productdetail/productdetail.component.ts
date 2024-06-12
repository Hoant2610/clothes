import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
DeleteSize(idClothes: number,idSize: number) {

}
  username: string;
  clothes: Clothes
  idClothes: number
  clothesForm: FormGroup
  numSizes : number[]
  numColors : number[]

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
        this.numSizes = Array.from({length: this.clothes.sizes.length}, (_, i) => i);
        this.numColors = Array.from({length: this.clothes.colors.length}, (_, i) => i);
        
      }
    );
    // this.clothesForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

  deleteColor() {
    throw new Error('Method not implemented.');
    }
}
