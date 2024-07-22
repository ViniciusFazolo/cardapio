import { Component, ViewChild } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { Api, Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { RouterLinkWithHref } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../../../services/user.service';
import { NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref, DataTablesModule, NgStyle],
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

  constructor(
    private userService: UserService,
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
    this.userService.getAll().subscribe((users) => {
      this.users = users;

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
    this.userService.delete(this.idItem).subscribe(
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
