import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';
import { Product } from '../pages/home-user/home-user.component';

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
