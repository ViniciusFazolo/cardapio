import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

type InputTypes = 'text' | 'password' | 'email' | 'tel';

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true,
    },
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.css',
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() mask: string = ''

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
