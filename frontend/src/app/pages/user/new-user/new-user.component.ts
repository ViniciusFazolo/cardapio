import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

}
