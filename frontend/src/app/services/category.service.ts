import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudRepository } from '../interfaces/CrudRepository';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';

export interface Category{
  id?: string,
  description: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends CrudService<Category>{
  private header = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
  });

  constructor(httpClient: HttpClient, private http: HttpClient) {
    super(httpClient, `${environment.apiUrl}/category`)
   }
 
  searchImg(filename: string):Observable<Blob>{
    return this.http.get<Blob>(`${environment.apiUrl}/category/assets/` + filename, { responseType: 'blob' as 'json', headers: this.header })
  }
}
