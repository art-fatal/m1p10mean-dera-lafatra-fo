import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {ServiceComponent} from "./service.component";
import {ServiceRoutingModule} from "./service-routing.module";
import {ListComponent} from "./list/list.component";
import {WidgetsModule} from "../../../_metronic/partials";

@NgModule({
    declarations: [ServiceComponent, ListComponent],
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule,
        NgbTooltipModule,
        ServiceRoutingModule,
        WidgetsModule
    ],
})
export class ServiceModule {
}
