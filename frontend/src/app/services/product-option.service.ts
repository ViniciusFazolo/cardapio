import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepository } from '../interfaces/CrudRepository';
import { Observable } from 'rxjs';

export interface Option {
  id?: string;
  option: string;
}

export interface ProductOption {
  id?: string;
  description: string;
  required: boolean;
  qtOptionsSelected: number;
  productOptions: Option[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductOptionService implements CrudRepository<ProductOption> {
  private url: string = 'http://localhost:8080/api/productOption';
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
    });
  }

  getAll(): Observable<ProductOption[]> {
    return this.httpClient.get<ProductOption[]>(`${this.url}/listAll`, {
      headers: this.header,
    });
  }

  getById(id: string): Observable<ProductOption> {
    return this.httpClient.get<ProductOption>(`${this.url}/list/${id}`, {
      headers: this.header,
    });
  }

  create(obj: ProductOption): Observable<ProductOption> {
    return this.httpClient.post<ProductOption>(`${this.url}/create`, obj, {
      headers: this.header,
    });
  }

  update(obj: ProductOption): Observable<ProductOption> {
    return this.httpClient.put<ProductOption>(
      `${this.url}/update/${obj.id}`,
      obj,
      { headers: this.header }
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`, {
      headers: this.header,
    });
  }
}
