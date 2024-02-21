import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {StaffService} from "src/app/services/staff-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy{
  displayedColumns: string[] = ['createdAt', 'name', 'email', 'actions']; // Exemple de colonnes
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe: Subscription[] = [];

  constructor(private toolbarAction: ToolbarActionService,private staffService: StaffService) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadData();

    const staffCollectionSubscr = this.staffService.collection$.subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.paginator.length = this.staffService.collectionLength;
      }
    });

    this.unsubscribe.push(staffCollectionSubscr)
  }

  loadData() {
    // Exemple de paramètres, à adapter selon votre API
    const requestParams = {
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pageSize: this.paginator ? this.paginator.pageSize : 10,
      sortField: this.sort ? this.sort.active : '',
      sortDirection: this.sort ? this.sort.direction : ''
    };

    const staffListSubscr = this.staffService.collection(requestParams).subscribe();
    this.unsubscribe.push(staffListSubscr)
  }

  // Gère les événements de pagination et de tri
  refreshDatatable() {
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
