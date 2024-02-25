import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {MockServerResultService} from "../../../../datatable/services/mock-server/mock-server-result.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {ServiceService} from "src/app/services/service-service";
import {ServiceModel} from "../../../../../models/service.model";

@Component({
  selector: 'app-list',
  providers: [MockServerResultService],
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

  private unsubscribe: Subscription[] = [];

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
    const requestParams = {
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      sortField: this.sort ? this.sort.active : '',
      sortDirection: this.sort ? this.sort.direction : ''
    };

    const collectionSubscr = this.service.collection(requestParams).subscribe();
    this.unsubscribe.push(collectionSubscr)
  }

  // Gère les événements de pagination et de tri
  refreshDatatable() {
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
