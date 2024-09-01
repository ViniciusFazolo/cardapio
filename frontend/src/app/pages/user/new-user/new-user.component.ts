import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/btns-end/btns-end.component';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { NgIf } from '@angular/common';
import { PrimaryInputComponent } from "../../../components/primary-input/primary-input.component";
import { User } from '../../../interfaces/user/user';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, ReactiveFormsModule, SkeletonModule, NgIf, PrimaryInputComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  myForm: FormGroup;
  id: string | null = null
  itemToEdit!: User
  showSkeleton: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      active: new FormControl(true)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.showSkeleton = true
        this.userService.listById(this.id).subscribe({
          next: () => {
            this.listById();
          },
          error: () => {
            this.route.navigate(['/adm/user']);
          }
        });
      }
    });
  }

  save(): void {
    if (!this.myForm.valid) {
      this.toastr.warning('Preencha todos os campos!');
      return;
    }
    
    if(this.myForm.value.password !== this.myForm.value.password2){
      this.toastr.warning('Senhas não coindicem!');
      return;
    }
 
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    let user: User = {
      name: this.myForm.value.username,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
      active: this.myForm.value.active
    };

    this.userService.create(user).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso!');
        this.route.navigate(['/adm/user']);
      },
      error: () => {
        this.toastr.error('Erro ao cadastrar, tente novamente!');
      }
    });
  }

  update() {
    this.itemToEdit.email = this.myForm.value.email
    this.itemToEdit.name = this.myForm.value.username
    this.itemToEdit.password = this.myForm.value.password == '' ? this.itemToEdit.password : this.myForm.value.password 
    this.itemToEdit.active = this.myForm.value.active

    this.userService.update(this.itemToEdit).subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!');
        this.route.navigate(['/adm/user']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar, tente novamente!');
      }
    });
  }

  listById() {
    this.userService.listById(this.id!).subscribe({
      next: (response) => {
        this.itemToEdit = response;

        this.showSkeleton = false

        this.myForm.patchValue({
          username: this.itemToEdit.name,
          email: this.itemToEdit.email,
          active: this.itemToEdit.active
        });

        this.myForm.controls['password'].clearValidators();
        this.myForm.controls['password'].updateValueAndValidity();
        this.myForm.controls['password2'].clearValidators();
        this.myForm.controls['password2'].updateValueAndValidity();
      }
    });
  }
}
