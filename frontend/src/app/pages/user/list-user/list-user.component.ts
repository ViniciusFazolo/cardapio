import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [DefaultLayoutPagesComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

}
