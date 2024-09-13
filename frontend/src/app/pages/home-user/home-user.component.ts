import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductComponent } from '../../components/product/product.component';
import { CardComponent } from '../../components/card/card.component';
import { UserlayoutComponent } from "../../components/userlayout/userlayout.component";
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ModalComponent } from "../../components/modal/modal.component";
import { NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { NumericSpinnerComponent } from '../../components/numeric-spinner/numeric-spinner.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderFrontend, ProductOptionsFrontend } from '../../interfaces/order/orderFrontend';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Category } from '../../interfaces/category/category';
import { Product } from '../../interfaces/product/product';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavbarComponent, ProductComponent, CardComponent, UserlayoutComponent, ModalComponent, NgIf, NumericSpinnerComponent, SkeletonModule, ReactiveFormsModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})

export class HomeUserComponent implements OnInit{
  myForm: FormGroup
  productSelect!: Product;

  categories!: Category[];
  subscriptions: Subscription[] = [];
  
  showSkeleton: boolean = true
  showModal: boolean = false;
  
  constructor(private categoryService: CategoryService, private toastr: ToastrService, private cart: CartService){
    this.myForm = new FormGroup({
      qtItems: new FormControl(0, [Validators.required]),
      notes: new FormControl(''),
      productOptions: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.listAll().subscribe({
      next: (response) => {
        this.categories = response
        this.showSkeleton = false
      }
    })
  }

  handleModal(obj: Product){
    this.productSelect = obj

    const optionsArray = this.myForm.get('productOptions') as FormArray;
    this.productSelect.productOptionTitle.forEach(title => {
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

        const subscription = productOption.get('checked')?.valueChanges.subscribe(() => {
          this.checkBoxIsCheckedSubscribe(productTitle, productOption);
        });

        if (subscription) {
          this.subscriptions.push(subscription);
        }
      })

      optionsArray.push(productTitle)
    });

    this.showModal = true
  }
  
  isModalVisible(){
    if (this.showModal) {
      this.resetForm();
      this.unsubscribeAll()
    }
    this.showModal = !this.showModal
  }

  resetForm() {
    this.myForm.reset({
      qtItems: 0,
      notes: ''
    });
  
    // Limpar o FormArray de productOptions
    const optionsArray = this.myForm.get('productOptions') as FormArray;
    while (optionsArray.length) {
      optionsArray.removeAt(0);
    }
  }

  unsubscribeAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
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
      product: this.productSelect
    }

    if(this.cart.addItemToCart(order)){
      this.toastr.success('Produto adicionado nos pedidos!')
    }  
    
    this.resetForm()
    this.showModal = false
  }
}
