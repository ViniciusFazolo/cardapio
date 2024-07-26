import { Component } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar-adm',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './navbar-adm.component.html',
  styleUrl: './navbar-adm.component.css'
})
export class NavbarAdmComponent {

  constructor(private route: Router){}

  logout(){
    sessionStorage.removeItem('auth-token')
    sessionStorage.removeItem('username')
    this.route.navigate(['/login']);
  }
}
