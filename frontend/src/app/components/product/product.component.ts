import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../pages/home-user/home-user.component';
import { ModalComponent } from '../modal/modal.component';
import { ChooseQtdProductComponent } from '../choose-qtd-product/choose-qtd-product.component';
import { ProductNotesComponent } from '../product-notes/product-notes.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, ModalComponent, ChooseQtdProductComponent, ProductNotesComponent, ReactiveFormsModule, CheckboxModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  myForm: FormGroup
  
  @Input() product!: Product;

  constructor(){
    this.myForm = new FormGroup({
      qtItems: new FormControl(0, [Validators.required]),
      notes: new FormControl('')
    })
  }
  
  ngOnInit(): void {
    
  }

  submit(){
    console.log(this.myForm.value.notes)
  }
}
