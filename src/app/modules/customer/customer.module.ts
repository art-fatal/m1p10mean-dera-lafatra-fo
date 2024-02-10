import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import {CustomerRoutingModule} from "./customer-routing.module";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";

@NgModule({
  declarations: [CustomerComponent, AppointmentHistoryComponent],
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule,
        NgbTooltipModule,
        CustomerRoutingModule,
        WidgetsModule,
        DropdownMenusModule,
    ],
})
export class CustomerModule {}
