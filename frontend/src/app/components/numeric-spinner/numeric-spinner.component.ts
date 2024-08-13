import { NgClass } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type TitleStyle = 'title' | 'label'

@Component({
  selector: 'app-numeric-spinner',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule, NgClass],
  templateUrl: './numeric-spinner.component.html',
  styleUrl: './numeric-spinner.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericSpinnerComponent),
      multi: true,
    },
  ]
})
export class NumericSpinnerComponent implements ControlValueAccessor{
  onChange: any = () => {};
  onTouched: any = () => {};
  value: number = 0;

  @Input() label: string = ''
  @Input() class: string = ''
  @Input() titleStyle: TitleStyle = 'title'
  
  add() {
    if (this.value == 99) return;
    this.value += 1;
    this.onChange(this.value)
  }

  less() {
    if (this.value == 1) return;
    this.value -= 1;
    this.onChange(this.value)
  }

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
