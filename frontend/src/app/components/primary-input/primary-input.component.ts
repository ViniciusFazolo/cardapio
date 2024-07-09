import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "password" | "email"

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.css',
})
export class PrimaryInputComponent {
  @Input() label: string = '';
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  value: string = '';
}