import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarCartComponent } from '../../../components/navbars/navbar-cart/navbar-cart.component';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { CartService } from '../../../services/cart.service';
import { OrderFrontend } from '../../../interfaces/order/orderFrontend';
import { NumericSpinnerComponent } from '../../../components/numeric-spinner/numeric-spinner.component';
import { ProductService } from '../../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ModalComponent } from "../../../components/modal/modal.component";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarCartComponent, PrimaryInputComponent, NumericSpinnerComponent, ReactiveFormsModule, CurrencyPipe, ModalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  itensCart: OrderFrontend[] = []
  totalValueOrder: number = 0

  isModalOpen: boolean = false

  constructor(private cartService: CartService, private productService: ProductService, private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getItemsCart()
    this.getImagesProduct()
    this.someTotalValueOrder()
  }

  getItemsCart(){
    this.itensCart = this.cartService.getItemToCart()
  }

  getImagesProduct(){
    for (const obj of this.itensCart) {
      this.productService.searchImg(obj.product.image).subscribe(response => {
        const file = new File([response], obj.product.image, { type: response.type });
        obj.product.imageUrl =  URL.createObjectURL(file)
      })
    }
  }

  someTotalValueOrder(){
    this.totalValueOrder = 0
    
    if(this.itensCart.length > 0){
      this.itensCart.forEach(item => {
        this.totalValueOrder += item.qtItems * item.product.price
      })

      this.cdr.detectChanges()
      return
    }

  }

  removeItemCart(item: OrderFrontend){
    this.cartService.removeItemToCart(item)
    this.ngOnInit()
  }

  qtItemOnChange(event: any, index: number){
    const item = this.itensCart.at(index);

    if (item) {
        // Atualiza a quantidade do item
        item.qtItems = event;

        // Atualiza o item no localStorage
        this.cartService.removeItemToCart(item);
        this.cartService.addItemToCart(item);

        // Atualiza o valor total do pedido
        this.someTotalValueOrder();
    }
}

  handleOrder(){
    if(!this.itensCart.length){
      this.toastr.warning('Adicione pelo menos um item!')
      return
    }

    //cria um pedido
    //adiciona produtos na tabela intermediaria

  }

  redirectToHome(){
    this.cartService.removeAllItens()
    this.router.navigate(['/'])
  }
}
