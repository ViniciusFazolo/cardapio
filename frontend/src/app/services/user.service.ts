import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id?: string,
  name: string,
  email: string,
  password: string,
  active: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url: string = 'http://localhost:8080/api/user'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/listAll`);
  }

  getById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.url}/list/` + id)
  }

  create(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.url}/create`, user);
  }

  update(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.url}/update/` + user.id, user)
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`)
  }
}
