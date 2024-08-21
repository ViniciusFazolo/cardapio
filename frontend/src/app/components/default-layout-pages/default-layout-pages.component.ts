import { Component, Input, OnInit } from '@angular/core';
import { NavbarAdmComponent } from "../navbar-adm/navbar-adm.component";
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-default-layout-pages',
  standalone: true,
  imports: [NavbarAdmComponent, RouterOutlet, RouterLinkWithHref, NgClass, NgIf],
  templateUrl: './default-layout-pages.component.html',
  styleUrl: './default-layout-pages.component.css'
})
export class DefaultLayoutPagesComponent implements OnInit{
  @Input() title: string = '';
  @Input() showBtn: boolean = false;
  @Input() btnNewLink: string = '';

  isSidebarOpen: boolean = false

  ngOnInit(){
    if(window.innerWidth >= 760){
      this.getIsSidebarOpen()
    }
  }

  toggleSidebar(){
    sessionStorage.setItem('isSidebarOpen', JSON.stringify(!this.isSidebarOpen))
    this.getIsSidebarOpen()
  }

  getIsSidebarOpen(){
    const isSidebarOpen = sessionStorage.getItem('isSidebarOpen')
    this.isSidebarOpen = isSidebarOpen ? JSON.parse(isSidebarOpen) : false
  }

  closeSidebarOnClickLink(){
    this.isSidebarOpen = false
  }
}
