import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpen = new BehaviorSubject<boolean>(false);
  public modalState = this.isModalOpen.asObservable();

  showModal(){
    this.isModalOpen.next(!this.isModalOpen.getValue())
  }
}
