import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderFrontend } from '../../interfaces/order/orderFrontend';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  qtItems: number = 0

  constructor(private cart: CartService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
      this.cart.qtItems.subscribe(value => this.qtItems = value)
  }

  goToCart(){
    const items: OrderFrontend[] = this.cart.getItemToCart()

    if(!items.length){
      this.toastr.warning('Adicione pelo menos um item!')
      return
    }

    this.router.navigate(['/cart'])
  }
}
