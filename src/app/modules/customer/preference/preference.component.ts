import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ServiceModel} from "../../../models/service.model";
import {ToolbarActionService} from "../../../_metronic/layout/core/toolbar-action.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterButtonComponent} from "../home/filter-button/filter-button.component";
import {StaffService} from "../../../services/staff-service";
import {StaffModel} from "../../../models/staff.model";
import {Roles} from "../../../enums/user/roles.enum";

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() color: string = 'danger';
  private unsubscribe: Subscription[] = [];

  staffCollection: Array<StaffModel>;

  constructor(
      private toolbarAction: ToolbarActionService,
      private modalService: NgbModal,
      private service: StaffService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(FilterButtonComponent);
  }


  ngAfterViewInit() {
    const postCollectionSubscr = this.service.collection().subscribe();

    const collectionSubscr = this.service.collection$.subscribe(data => {
      this.staffCollection = data.filter((user: StaffModel) => user.role === Roles.STAFF)
      this.cdr.detectChanges();
    });

    this.unsubscribe.push(collectionSubscr)
    this.unsubscribe.push(postCollectionSubscr)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  protected readonly Math = Math;
}
