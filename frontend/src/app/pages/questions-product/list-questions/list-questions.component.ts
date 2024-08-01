import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [DefaultLayoutPagesComponent],
  templateUrl: './list-questions.component.html',
  styleUrl: './list-questions.component.css'
})
export class ListQuestionsComponent {

}
