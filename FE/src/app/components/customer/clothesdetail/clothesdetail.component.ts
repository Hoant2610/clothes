import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Color } from 'src/app/entity/color';
import { Size } from 'src/app/entity/size';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothesdetail',
  templateUrl: './clothesdetail.component.html',
  styleUrls: ['./clothesdetail.component.css']
})
export class ClothesdetailComponent implements OnInit {
  colors: Color[] = []
  sizes: Size[] = []
  images: string[] = []
  clothes: Clothes
  nameClothes: string
  productForm: FormGroup;
  constructor(private clothesService: ClothesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      this.nameClothes = params['nameClothes'];
    });
    this.clothesService.getClothesByNameHome(this.nameClothes).subscribe(
      (response) => {
        console.log(response)
        this.clothes = response
        this.colors = this.clothes.colors
        this.sizes = this.clothes.sizes
        for (const color of this.clothes.colors) {
          this.images.push("assets/imgs/" + color.urlImage)
        }
        this.productForm.get('color').setValue(this.colors.length > 0 ? this.colors[0].color : null);
        this.productForm.get('size').setValue(this.sizes.length > 0 ? this.sizes[0].size : null);
      }
    )
    this.productForm = this.fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['1', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  Login() {
    this.router.navigate(['login'])
  }
  Register() {
    this.router.navigate(['register'])
  }
  Cart() {
    this.router.navigate(['/login'])
  }
  currentIndex = 0;

  visibleImages() {
    return this.images.slice(this.currentIndex, this.currentIndex + 2);
  }

  slideRight() {
    if (this.currentIndex < this.images.length - 2) {
      this.currentIndex++;
    }
  }
  slideLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  addToCart() {
    const data =  this.productForm.value
    console.log(this.productForm.value)
  }
  increase() {
    let quantity = parseInt(this.productForm.get('quantity').value);
    quantity++;
    this.productForm.get('quantity').setValue(quantity.toString());
  }

  decrease() {
    let quantity = parseInt(this.productForm.get('quantity').value);
    if (quantity > 1) {
      quantity--;
      this.productForm.get('quantity').setValue(quantity.toString());
    }
  }
}
