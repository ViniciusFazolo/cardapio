import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductComponent } from '../../components/product/product.component';
import { CardComponent } from '../../components/card/card.component';
import { UserlayoutComponent } from "../../components/userlayout/userlayout.component";
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ModalComponent } from "../../components/modal/modal.component";
import { NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { NumericSpinnerComponent } from '../../components/numeric-spinner/numeric-spinner.component';
import { Category } from '../../interfaces/category/categoryHome';
import { Product } from '../../interfaces/product/productHome';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavbarComponent, ProductComponent, CardComponent, UserlayoutComponent, ModalComponent, NgIf, NumericSpinnerComponent, SkeletonModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})

export class HomeUserComponent implements OnInit{
  categories!: Category[];
  products!: Product[]
  showSkeleton: boolean = true

  constructor(private categoryService: CategoryService, private productService: ProductService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.listAll().subscribe((response) => {
      this.categories = response
      this.getImagesCategory()
      this.getProducts()
    })
  }

  getImagesCategory(){
    for (const obj of this.categories) {
      this.categoryService.searchImg(obj.image).subscribe(response => {
        const file = new File([response], obj.image, { type: response.type });
        obj.imageUrl =  URL.createObjectURL(file)
      })
    }

    console.log(this.categories)
  }

  getProducts(){
    this.productService.listAll().subscribe(response => {
      this.products = response
      this.getImagesProduct()
    })
  }

  getImagesProduct(){
    for (const obj of this.products) {
      this.productService.searchImg(obj.image).subscribe(response => {
        const file = new File([response], obj.image, { type: response.type });
        obj.imageUrl =  URL.createObjectURL(file)
      })
    }

    this.showSkeleton = false
  }
}
