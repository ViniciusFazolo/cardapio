import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './navbar-adm.component.html',
  styleUrl: './navbar-adm.component.css'
})
export class NavbarAdmComponent {
  @Output() isSidebarOpen = new EventEmitter  ()

  constructor(private route: Router){}

  logout(){
    sessionStorage.removeItem('auth-token')
    sessionStorage.removeItem('username')
    this.route.navigate(['/login']);
  }

  openSidebar(){
    this.isSidebarOpen.emit()
  }
}
