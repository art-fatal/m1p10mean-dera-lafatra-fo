import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from './manager.component';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {ManagerRoutingModule} from "./manager-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {WidgetsModule} from "../../_metronic/partials";

@NgModule({
  declarations: [ManagerComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    ManagerRoutingModule,
    WidgetsModule
  ],
})
export class ManagerModule {}
