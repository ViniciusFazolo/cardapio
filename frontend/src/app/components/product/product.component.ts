import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent{
  @Input() product!: Product;
  @Output() toggleModal = new EventEmitter();

  openModal(){
    this.toggleModal.emit(this.product)
  }
}
