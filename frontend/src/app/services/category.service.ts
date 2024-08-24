import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';
import { Category } from '../interfaces/category/category';

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
 
  createWithFormData(obj: FormData): Observable<Category>{
    return this.http.post<Category>(`${environment.apiUrl}/category/create`, obj, {headers: this.header});
  }

  updateWithFormData(obj: FormData): Observable<Category>{
    return this.http.put<Category>(`${environment.apiUrl}/category/update/${obj.get('id')}` , obj, {headers: this.header});
  }
   
  searchImg(filename: string):Observable<Blob>{
    return this.http.get<Blob>(`${environment.apiUrl}/category/assets/` + filename, { responseType: 'blob' as 'json', headers: this.header })
  }
}
