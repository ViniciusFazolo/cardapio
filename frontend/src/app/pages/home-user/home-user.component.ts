import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductComponent } from '../../components/product/product.component';
import { CardComponent } from '../../components/card/card.component';
import { UserlayoutComponent } from "../../components/userlayout/userlayout.component";

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavbarComponent, ProductComponent, CardComponent, UserlayoutComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

}
