import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id?: string,
  name: string,
  email: string,
  password: string,
  active: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url: string = 'http://localhost:8080/api/user'
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
    })
   }

  getAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/listAll`, {headers: this.header});
  }

  getById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.url}/list/` + id, {headers: this.header})
  }

  create(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.url}/create`, user, {headers: this.header});
  }

  update(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.url}/update/` + user.id, user, {headers: this.header})
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`, {headers: this.header})
  }
}
