import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CrudService } from '../classes/CrudService';
import { User } from '../interfaces/user/user';

@Injectable({
  providedIn: 'root'
})

export class UserService extends CrudService<User> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/user`)
  }
}
