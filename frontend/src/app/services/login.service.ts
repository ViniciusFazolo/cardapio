import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response-type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>('/login', {email, password}).pipe(
      tap(
        value => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        }
      )
    )
  }
}
