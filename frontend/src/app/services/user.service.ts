import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CrudService } from '../classes/CrudService';

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

export class UserService extends CrudService<User> {

  constructor(httpClient: HttpClient, private http: HttpClient) {
    super(httpClient, `${environment.apiUrl}/user`)
  }
}
