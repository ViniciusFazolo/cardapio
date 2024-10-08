import { Component, ElementRef, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Category } from '../../../interfaces/category/category';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [
    DefaultLayoutPagesComponent,
    BtnsEndComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    SkeletonModule
  ],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  myForm: FormGroup;
  id: string | null = null;
  itemToEdit!: Category
  
  imageUploaded!: File;
  imgUrl: string | ArrayBuffer | null = null;
  showInputFile: boolean = true
  showSkeleton: boolean = false

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.showSkeleton = true
        this.categoryService.listById(this.id).subscribe({
          next: () => {
            this.listById();
          },
          error: () => {
            this.route.navigate(['/adm/category']);
          }
        });
      }
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
    const category = new FormData();
    category.append('description', this.myForm.value.description);
    category.append('image', this.imageUploaded);

    this.categoryService.createWithFormData(category).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso!');
        this.route.navigate(['/adm/category']);
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar, tente novamente!');
      }
    });
  }

  update() {
    const category = new FormData();
    category.append('description', this.myForm.value.description);

    if(this.imageUploaded){
      category.append('image', this.imageUploaded);
    }

    if (this.id) {
      category.append('id', this.id);
    }

    this.categoryService.updateWithFormData(category).subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!');
        this.route.navigate(['/adm/category']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar, tente novamente!');
      }
    });
  }

  listById() {
    this.categoryService.listById(this.id!).subscribe((response) => {
      this.itemToEdit = response;
      this.imgUrl = this.itemToEdit.imageUrl

      this.myForm.patchValue({
        description: this.itemToEdit.description,
      });

      this.myForm.controls['image'].clearValidators();
      this.myForm.controls['image'].updateValueAndValidity();

      this.showInputFile = false;
      this.showSkeleton = false
    });
  }

  //recebe uma imagem do input file
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
    this.imgUrl = ''
  }
}
