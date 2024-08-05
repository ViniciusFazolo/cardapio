import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import {
  ProductOption,
  ProductOptionService,
} from '../../../services/product-option.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterLinkWithHref } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-questions',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, DataTablesModule, ProgressBarModule, RouterLinkWithHref, ModalComponent, NgIf],
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

  constructor(
    private productOptionService: ProductOptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createDataTable();
    this.getProductOptions();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getProductOptions() {
    this.productOptionService.getAll().subscribe((obj) => {
      this.productOptions = obj;

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
  }

  deleteItem() {
    this.productOptionService.delete(this.idItem).subscribe(
      () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getProductOptions();
      },
      () => {
        this.toastr.error('Erro ao excluir registro!');
      }
    );
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
}
