import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {ServiceService} from "src/app/services/service-service";
import {ServiceModel} from "../../../../../models/service.model";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
      './list.component.scss',
  ]
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit{
  displayedColumns: string[] = ['name', 'price', 'duration', 'commission', 'actions']; // Exemple de colonnes
  dataSource = new MatTableDataSource<ServiceModel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  private unsubscribe: Subscription[] = [];

  swalOptions: SweetAlertOptions = { buttonsStyling: false };
  private selectedItem: ServiceModel;
  error: string;

  constructor(private toolbarAction: ToolbarActionService,private service: ServiceService) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadData();

    const collectionSubscr = this.service.collection$.subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.paginator.length = this.service.collectionLength;
      }
    });

    this.unsubscribe.push(collectionSubscr)
  }

  loadData() {
    // Exemple de paramètres, à adapter selon votre API
    this.service.collectionParams = {
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      sortField: this.sort ? this.sort.active : '',
      sortDirection: this.sort ? this.sort.direction : ''
    };
    const collectionSubscr = this.service.collection().subscribe();
    this.unsubscribe.push(collectionSubscr)
  }

  // Gère les événements de pagination et de tri
  refreshDatatable() {
    this.loadData();
  }

  edit(item: ServiceModel) {
    this.service.isLoadingSubject.next(true)
    this.service.currentSubject.next(item)
  }

  fireDelete(item: ServiceModel) {
    this.selectedItem = item
    this.deleteSwal.fire();
  }

  delete(){
    this.service.delete(this.selectedItem.id).subscribe({
      next: (response) => {
        if (response){
          this.successSwal.fire()
          this.loadData()
        }else{
          this.error = ""
          this.errorSwal.fire()
        }
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
