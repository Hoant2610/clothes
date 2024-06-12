import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { Color } from 'src/app/entity/color';
import { Size } from 'src/app/entity/size';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-customerclothesdetail',
  templateUrl: './customerclothesdetail.component.html',
  styleUrls: ['./customerclothesdetail.component.css']
})
export class CustomerclothesdetailComponent implements OnInit {
  username : string
  colors: Color[] = []
  sizes: Size[] = []
  images: string[] = []
  clothes: Clothes
  nameClothes: string
  productForm: FormGroup;

  constructor(private clothesService: ClothesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private localService : LocalService,
    private cartService : CartService
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
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
    this.router.navigate(['/cart'])
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
    const data = this.productForm.value
    this.cartService.AddToCart(this.username,this.clothes.id,data.color,data.size,data.quantity).subscribe(
      (response)=>{
        alert("Đã thêm vào giỏ hàng!")
      }
    )
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
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
}
