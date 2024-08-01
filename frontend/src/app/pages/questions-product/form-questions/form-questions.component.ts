import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
  selector: 'app-form-questions',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, ReactiveFormsModule, BtnsEndComponent, InputGroupModule],
  templateUrl: './form-questions.component.html',
  styleUrl: './form-questions.component.css'
})
export class FormQuestionsComponent {
  myForm: FormGroup

  constructor(){
    this.myForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      questions: new FormArray([])
    })
  }

  addQuestion(){
    (this.myForm.get('questions') as FormArray).push(new FormControl('', [Validators.required]))
  }

  removeQuestion(index: number){
    (this.myForm.get('questions') as FormArray).removeAt(index)
  }
}
