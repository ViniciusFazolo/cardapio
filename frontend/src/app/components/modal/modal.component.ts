import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent{
  isModalOpen:boolean = false

  @Input() id!: string;
  @Input() title!: string;
  @Input() btnPrimary!: string;
  @Output() confirm = new EventEmitter();
  @Output() close = new EventEmitter()

  constructor(){}

  onClick() {
    this.confirm.emit();
  }

  closeModal(){
    this.close.emit()
  }
}
