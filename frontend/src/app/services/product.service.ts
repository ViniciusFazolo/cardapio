import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.service';

export interface Product {
  id?: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = 'http://localhost:8080/api/product';
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
    })
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/listAll`, {headers: this.header});
  }

  getById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/list/` + id, {headers: this.header});
  }

  create(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}/create`, product, {headers: this.header});
  }

  update(product: FormData): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.url}/update/` + product.get('id'), product,{headers: this.header});
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`, {headers: this.header});
  }

  searchImg(filename: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.url}/assets/` + filename, {
      responseType: 'blob' as 'json',
      headers: this.header
    });
  }
}
