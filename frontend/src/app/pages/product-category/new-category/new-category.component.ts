import { Component } from '@angular/core';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, ReactiveFormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  onClick(){
    if(!this.myForm.valid) return;

    console.log('enviado')
  }
}
