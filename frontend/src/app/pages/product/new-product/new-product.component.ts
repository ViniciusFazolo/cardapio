import {  Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Category, CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductOption, ProductOptionService } from '../../../services/product-option.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    DefaultLayoutPagesComponent,
    BtnsEndComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    SkeletonModule,
    NgSelectModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  categories!: Category[];
  productOptions!: ProductOption[]
  img: string = '';
  imageUploaded!: File;
  myForm: FormGroup;
  id!: string | null;
  itemToEdit!: Product
  showInputFile: boolean = true
  imgUrl!: string | ArrayBuffer | null;
  showSkeleton: boolean = false

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productOptionService: ProductOptionService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      productOptionTitle: new FormControl([], [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductOptions();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.showSkeleton = true
        this.productService.getById(this.id).subscribe(
          () => {
            this.getById()
          },
          () => {
            this.route.navigate(['/adm/product']);
          }
        );
      }
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
    });
  }

  getProductOptions(){
    this.productOptionService.getAll().subscribe({
      next: (res) => {this.productOptions = res}
    })
  }

  getById() {
    this.productService.getById(this.id!).subscribe((response) => {
      this.itemToEdit = response

      this.myForm.patchValue({
        description: this.itemToEdit.description,
        price: this.itemToEdit.price,
        category: this.itemToEdit.category.id
      });

      this.myForm.controls['image'].clearValidators();
      this.myForm.controls['image'].updateValueAndValidity();

      this.loadImage(response)
      this.showInputFile = false;
      this.showSkeleton = false
    });
  }

  save(): void {
    if (!this.myForm.valid) {
      this.toastr.warning('Preencha todos os campos!');
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const product = new FormData();
    product.append('description', this.myForm.value.description);
    product.append('price', this.myForm.value.price);
    product.append('category', this.myForm.value.category);
    product.append('image', this.imageUploaded);

    const productOptionTitle = this.myForm.value.productOptionTitle;
    product.append('productOptionTitle', productOptionTitle)

    this.productService.create(product).subscribe(
      (response) => {
        this.toastr.success('Cadastrado com sucesso!');
        this.route.navigate(['/adm/product']);
      },
      (error) => {
        this.toastr.error('Erro ao cadastrar, tente novamente!');
      }
    );
  }

  update() {
    const product = new FormData();
    product.append('description', this.myForm.value.description);
    product.append('price', this.myForm.value.price)
    product.append('category', this.myForm.value.category)

    if (this.imageUploaded) {
      product.append('image', this.imageUploaded);
    }

    if (this.id) {
      product.append('id', this.id);
    }

    this.productService.update(product).subscribe(
      (response) => {
        this.toastr.success('Atualizado com sucesso!');
        this.route.navigate(['/adm/product']);
      },
      (error) => {
        this.toastr.error('Erro ao atualizar, tente novamente!');
      }
    );
  }

  uploadImage(e: any) {
    const file = e.target.files[0];

    if (
      file.type != 'image/png' &&
      file.type != 'image/jpg' &&
      file.type != 'image/jpeg'
    ) {
      this.toastr.warning('Arquivos suportados: PNG, JPG, JPEG');
      this.myForm.patchValue({ image: null });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
    reader.readAsDataURL(file);

    this.imageUploaded = file;
  }

  chooseImage(){
    this.myForm.controls['image'].addValidators([Validators.required])
    this.myForm.controls['image'].updateValueAndValidity();

    this.showInputFile = true
    this.imgUrl = null
  }

  loadImage(response: Product){
    this.productService.searchImg(response.image).subscribe((res) => {
      const file = new File([res], response.image, { type: res.type });
      this.imgUrl = URL.createObjectURL(file)
      this.imageUploaded = file
    })
  }

  addProductOptionTitle(event: any){
    const selectedOptions = event.value; // Should be an array of selected IDs
    const formArray = this.myForm.get('productOptionTitle') as FormArray;
    formArray.clear();
    selectedOptions.forEach((id: string) => {
      formArray.push(new FormControl(id));
    });

    console.log(this.myForm.value.productOptionTitle)
  }
}
