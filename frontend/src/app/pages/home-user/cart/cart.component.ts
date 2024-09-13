import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavbarCartComponent } from '../../../components/navbars/navbar-cart/navbar-cart.component';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { CartService } from '../../../services/cart.service';
import { OrderFrontend } from '../../../interfaces/order/orderFrontend';
import { NumericSpinnerComponent } from '../../../components/numeric-spinner/numeric-spinner.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../interfaces/order/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NavbarCartComponent,
    PrimaryInputComponent,
    NumericSpinnerComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    ModalComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  myForm: FormGroup;

  itensCart: OrderFrontend[] = [];
  totalValueOrder: number = 0;

  isModalOpen: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private orderService: OrderService
  ) {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      cel: new FormControl('', [Validators.required]),
      table: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getItemsCart();
    this.someTotalValueOrder();
  }

  getItemsCart() {
    this.itensCart = this.cartService.getItemToCart();
  }

  someTotalValueOrder() {
    this.totalValueOrder = 0;

    if (this.itensCart.length > 0) {
      this.itensCart.forEach((item) => {
        this.totalValueOrder += item.qtItems * item.product.price;
      });

      this.cdr.detectChanges();
    }
  }

  removeItemCart(item: OrderFrontend) {
    this.cartService.removeItemToCart(item);
    this.ngOnInit();
  }

  qtItemOnChange(event: any, index: number) {
    const item = this.itensCart.at(index);

    if (item) {
      item.qtItems = event;

      this.cartService.removeItemToCart(item);
      this.cartService.addItemToCart(item);

      this.someTotalValueOrder();
    }
  }

  handleOrder() {
    if (!this.itensCart.length) {
      this.toastr.warning('Adicione pelo menos um item!');
      return;
    }

    if (this.myForm.value.cel === '' || this.myForm.value.table === 0) {
      this.toastr.warning('Preencha os campos obrigatórios');
      return;
    }

    const order: Order = {
      clientName: this.myForm.value.name,
      tableNumber: this.myForm.value.table,
      phoneNumber: this.myForm.value.cel,
      valueTotalOrder: this.totalValueOrder,
      products: [],
    };

    this.itensCart.forEach((obj) => {
      order.products.push({
        notes: obj.notes,
        order: null,
        product: obj.product,
        quantity: obj.qtItems,
      });
    });

    this.orderService.create(order).subscribe({
      next: () => {
        this.cartService.removeAllItens();
        this.totalValueOrder = 0;
        this.isModalOpen = true;
      },
      error: () => {
        this.toastr.error("Erro ao pedir. Tente novamente!")
      }
    });
  }

  redirectToHome() {
    this.cartService.removeAllItens();
    this.router.navigate(['/']);
  }
}
