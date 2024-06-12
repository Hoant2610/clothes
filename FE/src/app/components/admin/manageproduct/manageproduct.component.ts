import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Clothes } from 'src/app/entity/clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {
  @Input() currentPage: number;
  @Input() totalPages: number;
  pages: (number | '...')[];
  items: number = 20
  username: string;
  products: Clothes[]

  constructor(private clothesService: ClothesService,
    private router: Router,
    private localService: LocalService) {
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

  Logout() {
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  private getListClothes(page: number, size: number) {
    this.clothesService.getListClothesAdmin(page, size).subscribe(
      (response) => {
        this.products = response.content
        console.log(response)
      }
    )
  }
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

  @Output() pageChanged = new EventEmitter<number>();
  limitDescription(description: string): string {
    if (!description) return ''; // Kiểm tra xem mô tả có tồn tại không
    if (description.length < 100) return description
    else {
      const limitedDescription = description.substring(0, 100);
      const lastSpaceIndex = limitedDescription.lastIndexOf(' ');
      if (lastSpaceIndex === -1) return limitedDescription;
      return limitedDescription.substring(0, lastSpaceIndex) + '...';
    }

  }

}
