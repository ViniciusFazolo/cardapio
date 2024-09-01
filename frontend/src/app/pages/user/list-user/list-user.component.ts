import { Component, HostListener, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { NgIf, NgStyle } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../interfaces/user/user';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref, DataTablesModule, NgStyle, ProgressBarModule, NgIf, ModalComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: User[] = [];
  idItem: string = '';

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  showProgressBar: boolean = true
  isModalOpen: boolean = false
  isDropdownOpen: number | null = null

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDataTable();
    this.getCategories();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getCategories() {
    this.userService.listAll().subscribe({
      next: (users) => {
        this.users = users;

        this.showProgressBar = false;

        if (this.dtElement.dtInstance != undefined) {
          this.rerender()
          return
        }
        
        this.dtTrigger.next(null);
      }
    });
  }

  saveItem(idItem: string) {
    this.idItem = idItem;
    this.showModal()
  }

  deleteItem() {
    this.userService.delete(this.idItem).subscribe({
      next: () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getCategories();
      },
      error: () => {
        this.toastr.error('Erro ao excluir registro!');
      }
    });

    this.showModal()
  }

  private createDataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: false,
      language: {
        url: 'assets/plugins/datatables/json/dataTables.ptbr.json',
      },
      columnDefs: [
        {
          orderable: false,
          targets: -1
        }
      ],
      lengthMenu: [5, 10, 25, 50, 100],
    };
  }

  private rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  showModal(){
    this.isModalOpen = !this.isModalOpen
  }

  toggleDropdown(index: number) {
    this.isDropdownOpen = this.isDropdownOpen === index ? null : index
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !targetElement.closest('.relative.inline-block.text-left')) {
      this.isDropdownOpen = null
    }
  }

  goToEdit(id: string){
    this.router.navigate([`/adm/user/${id}`])
  }
}
