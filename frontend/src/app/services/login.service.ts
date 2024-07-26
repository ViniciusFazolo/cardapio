import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response-type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/api/user'

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.url}/login`, {email, password}).pipe(
      tap(
        value => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        }
      )
    )
  }
}
