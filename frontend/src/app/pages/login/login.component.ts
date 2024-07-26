import { Component } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface LoginForm{
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimaryInputComponent, LoginLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastr.success("Login feito com sucesso!")
        this.router.navigate(['/adm/'])
      },
      error: () => this.toastr.error("Login não efetuado, tente novamente!")
    })
  }
}
