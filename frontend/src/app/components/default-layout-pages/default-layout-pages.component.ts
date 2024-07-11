import { Component, Input } from '@angular/core';
import { NavbarAdmComponent } from "../navbar-adm/navbar-adm.component";
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-layout-pages',
  standalone: true,
  imports: [NavbarAdmComponent, RouterOutlet, CommonModule, RouterLinkWithHref],
  templateUrl: './default-layout-pages.component.html',
  styleUrl: './default-layout-pages.component.css'
})
export class DefaultLayoutPagesComponent {
  @Input() title: string = '';
  @Input() showBtn: boolean = false;
  @Input() btnNewLink: string = '';
}
