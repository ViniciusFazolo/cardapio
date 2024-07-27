import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id?: string,
  description: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private url: string = 'http://localhost:8080/api/category'
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
    })
   }

  getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.url}/listAll`, {headers: this.header});
  }

  getById(id: string): Observable<Category>{
    return this.httpClient.get<Category>(`${this.url}/list/` + id, {headers: this.header})
  }

  create(category: FormData): Observable<Category>{
    return this.httpClient.post<Category>(`${this.url}/create`, category, {headers: this.header});
  }

  update(category: FormData): Observable<Category>{
    return this.httpClient.put<Category>(`${this.url}/update/` + category.get('id'), category, {headers: this.header})
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`, {headers: this.header})
  }

  searchImg(filename: string):Observable<Blob>{
    return this.httpClient.get<Blob>(`${this.url}/assets/` + filename, { responseType: 'blob' as 'json', headers: this.header })
  }
}
