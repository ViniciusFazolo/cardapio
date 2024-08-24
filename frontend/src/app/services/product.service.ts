import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.service';
import { CrudRepository } from '../interfaces/CrudRepository';
import { ProductOption } from './product-option.service';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';

export interface Product {
  id?: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  productOptionTitle: ProductOption[]
}

@Injectable({
  providedIn: 'root',
})
export class ProductService extends CrudService<Product>{
  private header = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
  });

  constructor(httpClient: HttpClient, private http: HttpClient) {
    super(httpClient, `${environment.apiUrl}/product`)
  }

  searchImg(filename: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrl}/product/assets/` + filename, {
      responseType: 'blob' as 'json',
      headers: this.header
    });
  }
}
