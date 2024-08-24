import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';
import { ProductOption } from '../interfaces/product-option/product-option';

@Injectable({
  providedIn: 'root',
})
export class ProductOptionService extends CrudService<ProductOption> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/productOption`)
  }
}
