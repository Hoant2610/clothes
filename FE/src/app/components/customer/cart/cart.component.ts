import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalPayment: number = 0
  totalItem: number = 0
  username: string
  carts: Cart[] = []
  constructor(private clothesService: ClothesService,
    private router: Router,
    private jwtService: JwtService,
    private cartService: CartService,
    private localService: LocalService
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.cartService.getAllFromCart(this.username).subscribe(
      (response) => {
        this.carts = response
        // console.log(this.carts)
        this.setup()
      }
    )
  }

  ngOnInit(): void {

  }
  setup() {
    for (const cart of this.carts) {
      this.totalItem += cart.quantity
      this.totalPayment += cart.quantity * cart.color.sellingPrice
    }
    for (let i = 0; i < this.carts.length; i++){
      
      let min = this.carts[i].color.sellingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ'
      let max = this.carts[i].color.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ'
      this.carts[i].color.originalPrice = max
      this.carts[i].color.sellingPrice = min
    }
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }
  decreaseItem(idCart: any) {
    const cart = this.carts.find(item => item.id === idCart);
    if(cart.quantity === 1){
      const confirmResult = window.confirm("Xóa sản phẩm khỏi giỏ hàng?");
      if (confirmResult) {
        this.cartService.DecreaseCart(idCart).subscribe(
          (response)=>{
            window.location.reload()
          }
        )
    } else {
        return;
    }
    }
    else{
      this.cartService.DecreaseCart(idCart).subscribe(
        (response)=>{
          window.location.reload()
        }
      )
    }
  }
  increaseItem(idCart: any) {
    this.cartService.IncreaseCart(idCart).subscribe(
      (response)=>{
        window.location.reload()
      }
    )
  }
}
