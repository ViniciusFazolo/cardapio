import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CrudService } from '../classes/CrudService';
import { Order } from '../interfaces/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends CrudService<Order>{

  constructor(httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/order`)
   }
 
}
