import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id?: string,
  description: string,
  urlImage: File | null
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private url: string = 'http://localhost:8080/api/categoria'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.url}/listAll`);
  }

  getById(id: string): Observable<Category>{
    return this.httpClient.get<Category>(`${this.url}/list/` + id)
  }

  create(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.url}/create`, category);
  }

  update(category: Category): Observable<Category>{
    console.log(category)
    return this.httpClient.put<Category>(`${this.url}/update/` + category.id, category)
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`)
  }
}
