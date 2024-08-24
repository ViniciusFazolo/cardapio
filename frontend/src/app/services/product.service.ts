import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';
import { Product } from '../interfaces/product/product';

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

  createWithFormData(obj: FormData): Observable<Product>{
    return this.http.post<Product>(`${environment.apiUrl}/product/create`, obj, {headers: this.header});
  }

  updateWithFormData(obj: FormData): Observable<Product>{
    return this.http.put<Product>(`${environment.apiUrl}/product/update/${obj.get('id')}` , obj, {headers: this.header});
  }

  searchImg(filename: string): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrl}/product/assets/` + filename, {
      responseType: 'blob' as 'json',
      headers: this.header
    });
  }
}
