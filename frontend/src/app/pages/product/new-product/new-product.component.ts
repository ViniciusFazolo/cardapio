import { Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CategoryService } from '../../../services/category.service';
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
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductOptionService } from '../../../services/product-option.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Category } from '../../../interfaces/category/category';
import { ProductOption } from '../../../interfaces/product-option/product-option';
import { Product } from '../../../interfaces/product/product';

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
    NgSelectModule,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  categories!: Category[];
  productOptions!: ProductOption[];
  img: string = '';
  imageUploaded!: File;
  myForm: FormGroup;
  id!: string | null;
  itemToEdit!: Product;
  showInputFile: boolean = true;
  imgUrl!: string | ArrayBuffer | null;
  showSkeleton: boolean = false;

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
      productOptionTitle: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductOptions();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.showSkeleton = true;
        this.productService.listById(this.id).subscribe({
          next: () => {
            this.listById();
          },
          error: () => {
            this.route.navigate(['/adm/product']);
          }
        });
      }
    });
  }

  getCategories() {
    this.categoryService.listAll().subscribe({
      next: (res) => {
        this.categories = res;
      }
    });
  }

  getProductOptions() {
    this.productOptionService.listAll().subscribe({
      next: (res) => {
        this.productOptions = res;
      },
    });
  }

  listById() {
    this.productService.listById(this.id!).subscribe((response) => {
      this.itemToEdit = response;
      this.imgUrl = this.itemToEdit.imageUrl

      let productOptionIds: string[] = [];
      this.itemToEdit.productOptionTitle.forEach((item) => {
        productOptionIds.push(item.id!);
      });

      this.myForm.patchValue({
        description: this.itemToEdit.description,
        price: this.itemToEdit.price,
        category: this.itemToEdit.category?.id,
        productOptionTitle: productOptionIds,
      });

      this.myForm.controls['image'].clearValidators();
      this.myForm.controls['image'].updateValueAndValidity();

      this.showInputFile = false;
      this.showSkeleton = false;
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
    product.append('productOptionTitle', productOptionTitle);

    this.productService.createWithFormData(product).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso!');
        this.route.navigate(['/adm/product']);
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar, tente novamente!');
      }
    });
  }

  update() {
    const product = new FormData();
    product.append('description', this.myForm.value.description);
    product.append('price', this.myForm.value.price);
    product.append('category', this.myForm.value.category);

    if (this.imageUploaded) {
      product.append('image', this.imageUploaded);
    }

    if (this.id) {
      product.append('id', this.id);
    }

    const productOptionTitle = this.myForm.value.productOptionTitle;
    product.append('productOptionTitle', productOptionTitle);

    this.productService.updateWithFormData(product).subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!');
        this.route.navigate(['/adm/product']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar, tente novamente!');
      }
    });
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

  chooseImage() {
    this.myForm.controls['image'].addValidators([Validators.required]);
    this.myForm.controls['image'].updateValueAndValidity();

    this.showInputFile = true;
    this.imgUrl = ''
  }

  addProductOptionTitle(event: any) {
    const selectedOptions = event.value;
    const formArray = this.myForm.get('productOptionTitle') as FormArray;
    formArray.clear();
    selectedOptions.forEach((id: string) => {
      formArray.push(new FormControl(id));
    });
  }
}
