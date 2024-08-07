import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-choose-qtd-product',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe],
  templateUrl: './choose-qtd-product.component.html',
  styleUrl: './choose-qtd-product.component.css',
})
export class ChooseQtdProductComponent {
  quantity: number = 0;

  add() {
    if (this.quantity == 99) return;
    this.quantity += 1;
  }

  less() {
    if (this.quantity == 0) return;
    this.quantity -= 1;
  }
}
