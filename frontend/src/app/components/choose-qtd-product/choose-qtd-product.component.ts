import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-choose-qtd-product',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe],
  templateUrl: './choose-qtd-product.component.html',
  styleUrl: './choose-qtd-product.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChooseQtdProductComponent),
      multi: true,
    },
  ]
})
export class ChooseQtdProductComponent implements ControlValueAccessor{
  onChange: any = () => {};
  onTouched: any = () => {};
  value: number = 0;

  add() {
    if (this.value == 99) return;
    this.value += 1;
    this.onChange(this.value)
  }

  less() {
    if (this.value == 0) return;
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
