import { Component, OnInit, Optional } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { InputGroupModule } from 'primeng/inputgroup';
import {
  ProductOptionService,
} from '../../../services/product-option.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NumericSpinnerComponent } from '../../../components/numeric-spinner/numeric-spinner.component';
import { ProductOption } from '../../../interfaces/product-option/product-option';

@Component({
  selector: 'app-form-questions',
  standalone: true,
  imports: [
    DefaultLayoutPagesComponent,
    ReactiveFormsModule,
    BtnsEndComponent,
    InputGroupModule,
    NumericSpinnerComponent
  ],
  templateUrl: './form-questions.component.html',
  styleUrl: './form-questions.component.css',
})
export class FormQuestionsComponent implements OnInit {
  id!: string | null;
  myForm: FormGroup;

  showSkeleton: boolean = false;

  constructor(
    private productOptionService: ProductOptionService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.myForm = new FormGroup({
      required: new FormControl(true),
      description: new FormControl('', [Validators.required]),
      qtOptionsSelected: new FormControl(0),
      options: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.showSkeleton = true;
        this.productOptionService.listById(this.id).subscribe(
          () => {
            this.listById();
          },
          () => {
            this.route.navigate(['/adm/productOption']);
          }
        );
      }
    });
  }

  save(): void {
    if (!this.myForm.valid) {
      this.toastr.warning('Preencha todos os campos!');
      return;
    }
    
    if(this.myForm.value.qtOptionsSelected > this.myForm.value.options.length){
      this.toastr.warning('A quantidade de opções selecionadas deve ser menor ou igual as opções disponíveis!');
      return;
    }

    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const produtOption: ProductOption = {
      description: this.myForm.value.description,
      required: this.myForm.value.required,
      productOptions: this.myForm.value.options,
      qtOptionsSelected: this.myForm.value.qtOptionsSelected
    };

    this.productOptionService.create(produtOption).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso!');
        this.route.navigate(['/adm/productOption']);
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar, tente novamente!');
      },
    });
  }

  update() {
    const produtOption: ProductOption = {
      id: this.id!,
      description: this.myForm.value.description,
      required: this.myForm.value.required,
      qtOptionsSelected: this.myForm.value.qtOptionsSelected,
      productOptions: this.myForm.value.options
    };

    this.productOptionService.update(produtOption).subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!');
        this.route.navigate(['/adm/productOption']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar, tente novamente!');
      },
    });
  }

  listById() {
    this.productOptionService.listById(this.id!).subscribe((response) => {
      this.myForm.patchValue({
        description: response.description,
        required: response.required,
        qtOptionsSelected: response.qtOptionsSelected
      })
      
      const optionsArray = this.myForm.get('options') as FormArray;
      optionsArray.clear();
      response.productOptions.forEach(option => {
        optionsArray.push(new FormGroup({
          id: new FormControl(option.id),
          option: new FormControl(option.option, [Validators.required])
        }));
      });
    })
  }

  addQuestion() {
    (this.myForm.get('options') as FormArray).push(
      new FormGroup({
        id: new FormControl(null),
        option: new FormControl('', [Validators.required])
      })
    );
  }

  removeQuestion(index: number) {
    (this.myForm.get('options') as FormArray).removeAt(index);
  }
}
