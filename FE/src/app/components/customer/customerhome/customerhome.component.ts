import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ClothesService } from '../../../services/clothes.service';
import { JwtService } from 'src/app/services/jwt.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Clothes } from 'src/app/entity/clothes';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.css']
})
export class CustomerhomeComponent implements OnInit {
  @Input() currentPage: number;
  @Input() totalPages: number;
  pages: (number | '...')[];
  items: number = 16
  clothes: any[] = [];
  list: Clothes[]
  username : string
  optionsVisible: boolean = false;
  showLinks: boolean = false;
  links: string[] = ["Link 1", "Link 2", "Link 3", "Link 4", "Link 5"];
  
  constructor(
    // private currencyPipe: CurrencyPipe,
    private http: HttpClient,
    private clothesService: ClothesService,
    private router: Router,
    private localService : LocalService,
    private renderer: Renderer2
  ) {
    const tmp = localService.GetLocalStorage("username");
    this.username = tmp || "";
    this.clothesService.getListClothesHome(0, this.items).subscribe(
      (response) => {
        this.totalPages = response.totalPages
        this.currentPage = 1
        this.generatePages()
      }
    )
  }

  ngOnInit(): void {

  }

  private getListClothes(page: number, size: number) {
    this.clothesService.getListClothesHome(page, size).subscribe(data => {
      this.list = data.content;
      console.log(data)
      for (let i = 0; i < this.list.length; i++) {
        let min = 0
        let max = 0
        min = this.list[i].colors[0].sellingPrice;
        max = this.list[i].colors[0].originalPrice;
        for (let j = 1; j < this.list[i].colors.length; j++) {
          if (min > this.list[i].colors[j].sellingPrice) {
            min = this.list[i].colors[j].sellingPrice
          }
          if (max < this.list[i].colors[j].originalPrice) {
            max = this.list[i].colors[j].originalPrice
          }
        }
        // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ'
        this.list[i].minPrice = min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ'
        this.list[i].maxPrice = max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ'
      }
      // console.log(this.list)
    });
  }
  CheckLogin() {
    const jwtToken = localStorage.getItem('jwt');
    console.log(jwtToken)
    if (jwtToken) return true;
    return false
  }
  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }

  Cart() {
    this.router.navigate(['/cart'])
  }
  // ngOnChanges() {
  //   this.generatePages();
  // }

  generatePages() {
    this.getListClothes(this.currentPage - 1, this.items);
    const visiblePages = 3; // Số lượng trang hiển thị (bao gồm trang hiện tại)
    const buffer = 2; // Số lượng trang trước và sau trang hiện tại
    this.pages = [];

    if (this.totalPages <= visiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - buffer);
      let end = Math.min(this.totalPages, this.currentPage + buffer);

      if (this.currentPage - buffer <= 1) {
        end = visiblePages;
      }

      if (this.currentPage + buffer >= this.totalPages) {
        start = this.totalPages - visiblePages + 1;
      }

      if (start > 1) {
        this.pages.push(1, '...');
      }

      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }

      if (end < this.totalPages) {
        this.pages.push('...', this.totalPages);
      }
    }
  }

  goToPage(page: number | string) {
    if (page !== this.currentPage && page !== '...') {
      this.currentPage = typeof page === 'number' ? page : parseInt(page as string);
      this.pageChanged.emit(this.currentPage);
      this.generatePages();
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
  toggleOptions(username: string) {
    this.optionsVisible = !this.optionsVisible;
    const optionsDiv = document.getElementById('options_' + username);
    if (optionsDiv) {
      if (this.optionsVisible) {
        this.renderer.setStyle(optionsDiv, 'display', 'block');
      } else {
        this.renderer.setStyle(optionsDiv, 'display', 'none');
      }
    }
  }
  @Output() pageChanged = new EventEmitter<number>();
}
