import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() btnPrimary!: string;
  @Input() positionMiddle: boolean = false;
  @Input() scrollable: boolean = false;
  @Output() confirm = new EventEmitter();

  onClick() {
    this.confirm.emit();
  }
}
