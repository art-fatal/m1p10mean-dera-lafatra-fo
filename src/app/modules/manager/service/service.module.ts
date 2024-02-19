import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {ServiceComponent} from "./service.component";
import {ServiceRoutingModule} from "./service-routing.module";
import {ListComponent} from "./component/list/list.component";
import {WidgetsModule} from "../../../_metronic/partials";
import { CreateButtonComponent } from './component/list/create-button/create-button.component';
import { FormComponent } from './component/form/form.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {DynamicTableModule} from "material-dynamic-table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    declarations: [ServiceComponent, ListComponent, CreateButtonComponent, FormComponent],
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule,
        NgbTooltipModule,
        ServiceRoutingModule,
        WidgetsModule,
        NgxDatatableModule,
        SweetAlert2Module,
        DynamicTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
    ],
})
export class ServiceModule {
}
