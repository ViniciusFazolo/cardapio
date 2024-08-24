import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRepository } from '../interfaces/CrudRepository';
import { Observable } from 'rxjs';
import { CrudService } from '../classes/CrudService';
import { environment } from '../environments/environment';

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
export class ProductOptionService extends CrudService<ProductOption> {

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/productOption`)
  }
}
