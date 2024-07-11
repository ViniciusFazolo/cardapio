import { Component, Input } from '@angular/core';
import { NavbarAdmComponent } from "../navbar-adm/navbar-adm.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout-pages',
  standalone: true,
  imports: [NavbarAdmComponent, RouterOutlet],
  templateUrl: './default-layout-pages.component.html',
  styleUrl: './default-layout-pages.component.css'
})
export class DefaultLayoutPagesComponent {
  @Input() title: string = '';
}
