import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../pages/home-user/home-user.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() subtitle: string = '';
  @Input() text: string = '';
  @Input() category!: Category
}
