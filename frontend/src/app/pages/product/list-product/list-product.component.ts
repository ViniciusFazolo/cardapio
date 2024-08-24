import { Component, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { ProductService } from '../../../services/product.service';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { RouterLinkWithHref } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ModalService } from '../../../services/modal.service';
import { Product } from '../../../interfaces/product/product';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref, DataTablesModule, ProgressBarModule, NgIf, ModalComponent],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  products: Product[] = [];
  idItem: string = '';

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  showProgressBar: boolean = true

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.createDataTable();
    this.getCategories();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getCategories() {
    this.productService.listAll().subscribe((products) => {
      this.products = products;

      this.showProgressBar = false;

      if (this.dtElement.dtInstance != undefined) {
        this.rerender()
        return
      }
      
      this.dtTrigger.next(null);
    });
  }

  //save item id to delete if confirm
  saveItem(idItem: string) {
    this.idItem = idItem;
    this.showModal()
  }

  deleteItem() {
    this.productService.delete(this.idItem).subscribe(
      () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getCategories();
      },
      () => {
        this.toastr.error('Erro ao excluir registro!');
      }
    );
    
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
    this.modal.showModal()
  }
}
