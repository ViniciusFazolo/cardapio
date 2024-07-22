import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.service';

export interface Product {
  id?: string,
  price: number,
  description: string,
  urlImage: string,
  category: Category
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url: string = 'http://localhost:8080/api/product'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.url}/listAll`);
  }

  getById(id: string): Observable<Product>{
    return this.httpClient.get<Product>(`${this.url}/list/` + id)
  }

  create(product: FormData): Observable<Product>{
    return this.httpClient.post<Product>(`${this.url}/create`, product);
  }

  update(product: FormData): Observable<Product>{
    return this.httpClient.put<Product>(`${this.url}/update/` + product.get('id'), product)
  }

  delete(id: string): Observable<void>{
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`)
  }

  searchImg(filename: string):Observable<Blob>{
    return this.httpClient.get<Blob>(`${this.url}/assets/` + filename, { responseType: 'blob' as 'json' })
  }
}
