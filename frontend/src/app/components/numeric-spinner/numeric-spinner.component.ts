import { NgClass } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type TitleStyle = 'title' | 'label'

@Component({
  selector: 'app-numeric-spinner',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule, NgClass, FormsModule],
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
  private _value: number = 1;
  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  @Input() label: string = '';
  @Input() class: string = '';
  @Input() titleStyle: TitleStyle = 'title';

  get value(): number {
    return this._value;
  }

  @Input() set value(val: number) {
    if (val >= 1 && val <= 99) {
      this._value = val;
      this.onChange(this._value);
    }
  }

  add() {
    if (this._value < 99) {
      this.value += 1;
    }
  }

  less() {
    if (this._value > 1) {
      this.value -= 1;
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.value = value;
  }

  writeValue(value: any): void {
    if (typeof value === 'number') {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
