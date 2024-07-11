import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from "../../components/default-layout-pages/default-layout-pages.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DefaultLayoutPagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
