import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id?: string,
  description: string,
  image: File | null
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private url: string = 'http://localhost:8080/api/category'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.url}/listAll`);
  }

  getById(id: string): Observable<Category>{
    return this.httpClient.get<Category>(`${this.url}/list/` + id)
  }

  create(category: FormData): Observable<Category>{
    return this.httpClient.post<Category>(`${this.url}/create`, category);
  }

  update(category: FormData): Observable<Category>{
    return this.httpClient.put<Category>(`${this.url}/update/` + category.get('id'), category)
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`)
  }
}
