import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ProductNotesComponent } from '../product-notes/product-notes.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { NumericSpinnerComponent } from '../numeric-spinner/numeric-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../services/modal.service';
import { Product } from '../../interfaces/product/productHome';
import { CartService } from '../../services/cart.service';
import { OrderFrontend, ProductOptionsFrontend } from '../../interfaces/order/orderFrontend';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, ModalComponent, NumericSpinnerComponent, ProductNotesComponent, ReactiveFormsModule, CheckboxModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  myForm: FormGroup
  
  @Input() product!: Product;
  @Output() toggleModal = new EventEmitter();

  constructor(private toastr: ToastrService, private modal: ModalService, private cart: CartService){
    this.myForm = new FormGroup({
      qtItems: new FormControl(0, [Validators.required]),
      notes: new FormControl(''),
      productOptions: new FormArray([])
    })
  }
  
  ngOnInit(): void {
    const optionsArray = this.myForm.get('productOptions') as FormArray;
    this.product.productOptionTitle.forEach(title => {
      let productTitle = new FormGroup({
        id: new FormControl(title.id),
        description: new FormControl(title.description),
        required: new FormControl(title.required),
        qtOptionsSelected: new FormControl(title.qtOptionsSelected),
        options: new FormArray([])
      })

      title.productOptions.forEach(option => {
        let productOption = new FormGroup({
          checked: new FormControl(false),
          id: new FormControl(option.id),
          option: new FormControl(option.option),
        });

        (productTitle.get('options') as FormArray).push(productOption)

        productOption.get('checked')?.valueChanges.subscribe(() => {
          this.checkBoxIsCheckedSubscribe(productTitle, productOption);
        });
      })

      optionsArray.push(productTitle)
    });
  } 

  checkBoxIsCheckedSubscribe(productTitle: FormGroup, productOption: FormGroup) {
    const optionsArray = productTitle.get('options') as FormArray;
    const maxSelections = productTitle.value.qtOptionsSelected;
    const checkedOptions = optionsArray.controls.filter(optionGroup => 
      (optionGroup.get('checked') as FormControl).value
    );
  
    if (checkedOptions.length > maxSelections) {
      productOption.patchValue({
        checked: false
      })
    }
  }

  submit(){
    let productOptionsFrontend: ProductOptionsFrontend[] = []

    if(!this.myForm.value.qtItems){
      this.toastr.warning("Selecione a quantidade!")
      return
    }

    const productOptions = this.myForm.get('productOptions') as FormArray
    for(const productOption of productOptions.controls) {
      if(productOption.get('required')?.value){
        const options = productOption.get('options') as FormArray
        const checked = options.controls.some(option => {
          return option.get('checked')?.value
        })

        if(!checked){
          this.toastr.warning("Selecione pelo menos um item dos campos obrigatórios")
          return
        }
      }

      productOptionsFrontend.push({
          id: productOption.get('id')?.value,
          description: productOption.get('description')?.value,
          qtOptionsSelected: productOption.get('qtOptionsSelected')?.value,
          required: productOption.get('required')?.value,
          options: productOption.get('options')?.value,
      })

    }
    
    let order: OrderFrontend = {
      notes: this.myForm.value.notes,
      qtItems: this.myForm.value.qtItems,
      productOptions: productOptionsFrontend,
      product: this.product
    }

    this.cart.addItemToCart(order)
  }

  openModal(){
    this.toggleModal.emit(this.product)
  }
}
