import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../pages/home-user/home-user.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, ModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() openProductDetails = new EventEmitter<Product>()

  onClick(product: Product){
    this.openProductDetails.emit(product)
  }
}
