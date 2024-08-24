import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T extends {id?: string}> {
  private httpHeaders: HttpHeaders

  constructor(private httpClient: HttpClient, private url: string) {
    this.httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
    })
  }

  listAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/listAll`, {headers: this.httpHeaders});
  }

  listById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/list/${id}`, {headers: this.httpHeaders});
  }

  create(obj: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/create`, obj, {headers: this.httpHeaders});
  }

  update(obj: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/update/${obj.id}`, obj, {headers: this.httpHeaders});
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete/${id}`, {headers: this.httpHeaders});
  }
}
