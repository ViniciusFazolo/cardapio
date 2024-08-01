import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-btns-end',
  standalone: true,
  imports: [RouterLinkWithHref, SkeletonModule, NgIf],
  templateUrl: './btns-end.component.html',
  styleUrl: './btns-end.component.css'
})
export class BtnsEndComponent {
  @Input() previousPage!: string
  @Input() showSkeleton!: boolean;
  @Output() onClickEmitter = new EventEmitter();

  onClick(){
    this.onClickEmitter.emit()
  }
}
