import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar-cart',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './navbar-cart.component.html',
  styleUrl: './navbar-cart.component.css'
})
export class NavbarCartComponent {

}
