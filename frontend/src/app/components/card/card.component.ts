import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../../interfaces/category/category';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  isProductsVisible: boolean = false

  @Input() subtitle: string = '';
  @Input() text: string = '';
  @Input() category!: Category
  
  toggleProductsVisibility(){
    this.isProductsVisible = !this.isProductsVisible
  }
}
