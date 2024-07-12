import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-btns-end',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './btns-end.component.html',
  styleUrl: './btns-end.component.css'
})
export class BtnsEndComponent {
  @Input() previousPage: string = ''
  @Output() onClickEmitter = new EventEmitter();

  onClick(){
    this.onClickEmitter.emit()
  }
}