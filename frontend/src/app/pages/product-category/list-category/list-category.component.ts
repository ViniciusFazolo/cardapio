import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { CategoryService } from '../../../services/category.service';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Category } from '../../../interfaces/category/category';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [
    DefaultLayoutPagesComponent,
    CommonModule,
    RouterLinkWithHref,
    DataTablesModule,
    ProgressBarModule,
    NgIf,
    ModalComponent
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css',
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  idItem: string = '';

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  showProgressBar: boolean = true
  isModalOpen: boolean = false
  isDropdownOpen: number | null = null

  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.listAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.showProgressBar = false
        
        if (this.dtElement.dtInstance != undefined) {
          this.rerender()
          return
        }

        this.dtTrigger.next(null);
      }
    });
  }

  //save item id to delete if confirm
  saveItem(idItem: string) {
    this.idItem = idItem;
    this.showModal()
  }

  deleteItem() {
    this.categoryService.delete(this.idItem).subscribe({
      next: () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getCategories();
      },
      error: () => {
        this.toastr.error('Erro ao excluir registro. Possa ser que esteja vinculado a um ou mais registros!');
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
    this.router.navigate([`/adm/category/${id}`])
  }
}
