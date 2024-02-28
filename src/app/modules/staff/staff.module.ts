import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffComponent} from './staff.component';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {StaffRoutingModule} from "./staff-routing.module";
import {SharedModule} from "../../_metronic/shared/shared.module";

@NgModule({
  declarations: [StaffComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    StaffRoutingModule,
    SharedModule,
  ],
})
export class StaffModule {}
