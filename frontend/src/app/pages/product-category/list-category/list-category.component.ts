import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { Category, CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLinkWithHref } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [
    DefaultLayoutPagesComponent,
    CommonModule,
    RouterLinkWithHref,
    DataTablesModule,
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

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createDataTable();
    this.getCategories();
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getCategories() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;

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
    this.categoryService.delete(this.idItem).subscribe(
      () => {
        this.toastr.success('Registro excluído com sucesso!');
        this.getCategories();
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
