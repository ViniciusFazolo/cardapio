import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() description: string = '';
  @Input() price: string | null = '';
  @Input() image: string = '';
  @Input() imageDescription: string = '';

  constructor(private currencyPipe: CurrencyPipe) {
    this.price = this.currencyPipe.transform(this.price, 'BRL', 'symbol', '1.2-2', 'pt-BR');
  }
}
