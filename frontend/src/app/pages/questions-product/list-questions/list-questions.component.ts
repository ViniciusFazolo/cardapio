import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import {
  ProductOptionService,
} from '../../../services/product-option.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarModule } from 'primeng/progressbar';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { NgIf } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProductOption } from '../../../interfaces/product-option/product-option';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, DataTablesModule, ProgressBarModule, RouterLinkWithHref, ModalComponent, NgIf, SplitButtonModule],
  templateUrl: './list-questions.component.html',
  styleUrl: './list-questions.component.css',
})

export class ListQuestionsComponent implements OnInit, OnDestroy{
  productOptions: ProductOption[] = [];
  idItem: string = '';

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  showProgressBar: boolean = true;
  isModalOpen: boolean = false
  isDropdownOpen: number | null = null

  constructor(
    private productOptionService: ProductOptionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDataTable();
    this.getProductOptions();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProductOptions() {
    this.productOptionService.listAll().subscribe({next: 
      (obj) => {
        this.productOptions = obj;

        this.showProgressBar = false;

        if (this.dtElement.dtInstance != undefined) {
          this.rerender()
          return
        }
        
        this.dtTrigger.next(null);
      }
    });
  }

  goToEdit(id: string){
    this.router.navigate([`/adm/productOption/${id}`])
  }

  saveItem(idItem: string) {
    this.idItem = idItem;
    this.showModal()
  }

  deleteItem() {
    this.productOptionService.delete(this.idItem).subscribe({
      next: () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getProductOptions();
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
}
