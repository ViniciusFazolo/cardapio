import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductComponent } from '../product/product.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-userlayout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavbarComponent, ProductComponent, CardComponent],
  templateUrl: './userlayout.component.html',
  styleUrl: './userlayout.component.css'
})
export class UserlayoutComponent {

}
