import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css'
})
export class LoginLayoutComponent {
  @Output('submit') onSubmit = new EventEmitter()
  @Input() disableBtn: boolean = true;

  submit(){
    this.onSubmit.emit()
  }
}
