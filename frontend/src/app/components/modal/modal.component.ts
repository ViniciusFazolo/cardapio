import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit{
  isModalOpen:boolean = false

  @Input() id!: string;
  @Input() title!: string;
  @Input() btnPrimary!: string;
  @Input() positionMiddle: boolean = false;
  @Input() scrollable: boolean = false;
  @Output() confirm = new EventEmitter();
  @Output() close = new EventEmitter()

  constructor(private modalService: ModalService){}

  ngOnInit(): void {
    this.modalService.modalState.subscribe(isOpen => {
      this.isModalOpen = isOpen
    })
  }

  onClick() {
    this.confirm.emit();
  }

  showModal(){
    this.modalService.showModal();
  } 
}
