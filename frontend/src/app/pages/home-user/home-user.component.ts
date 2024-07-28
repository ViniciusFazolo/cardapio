import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductComponent } from '../../components/product/product.component';
import { CardComponent } from '../../components/card/card.component';
import { UserlayoutComponent } from "../../components/userlayout/userlayout.component";
import { CategoryService } from '../../services/category.service';

interface Category {
  id?: string,
  description: string,
  image: string,
  imageUrl?: string
}

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavbarComponent, ProductComponent, CardComponent, UserlayoutComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})

export class HomeUserComponent implements OnInit{
  categories!: Category[];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAll().subscribe((response) => {
      this.categories = response
      this.loadImages()
    })
  }

  loadImages(){
    for (const obj of this.categories) {
      this.categoryService.searchImg(obj.image).subscribe(response => {
        const file = new File([response], obj.image, { type: response.type });
        obj.imageUrl =  URL.createObjectURL(file)
      })
    }
  }
}
