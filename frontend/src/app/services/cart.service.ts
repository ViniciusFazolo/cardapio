import { Injectable } from '@angular/core';
import { OrderFrontend } from '../interfaces/order/orderFrontend';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  qtItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private toastr: ToastrService) { 
    this.updateQtItems()
  }

  addItemToCart(obj: OrderFrontend): boolean{
    let items: OrderFrontend[] = [];

    if (localStorage.getItem('itemsCart')) {
      let itemsFromStorage = localStorage.getItem('itemsCart');
      
      if (itemsFromStorage) {
        items = JSON.parse(itemsFromStorage); 
      }
    } 
    
    //verifica se o produto ja foi adicionado ao carrinho
    let itemAlreadyAdded = items.some(item => {
      return item.product.id == obj.product.id
    })

    if(itemAlreadyAdded){
      this.toastr.warning('Esse item já foi adicionado ao carrinho')
      return false
    }
    
    items.push(obj);
    localStorage.setItem('itemsCart', JSON.stringify(items));

    this.updateQtItems()
    
    return true
  }

  getItemToCart(): OrderFrontend[]{
    let items: OrderFrontend[] = []
    
    if (localStorage.getItem('itemsCart')) {
      let itemsFromStorage = localStorage.getItem('itemsCart');
      
      if (itemsFromStorage) {
        items = JSON.parse(itemsFromStorage); 
      }
    } 

    return items
  }

  removeItemToCart(obj: OrderFrontend){
    const items: OrderFrontend[] = this.getItemToCart();
    let itemsFiltered = items.filter(item => item.product.id !== obj.product.id);

    localStorage.setItem('itemsCart', JSON.stringify(itemsFiltered));
    this.updateQtItems();
}

  removeAllItens(){
    localStorage.removeItem('itemsCart')

    this.updateQtItems()
  }

  updateQtItems(){
    const items = this.getItemToCart()
    this.qtItems.next(items.length)
  }
}
