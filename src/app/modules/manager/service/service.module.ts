import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {ServiceComponent} from "./service.component";
import {ServiceRoutingModule} from "./service-routing.module";
import {ListComponent} from "./list/list.component";
import {WidgetsModule} from "../../../_metronic/partials";
import { CreateButtonComponent } from './list/create-button/create-button.component';
import { FormComponent } from './form/form.component';

@NgModule({
    declarations: [ServiceComponent, ListComponent, CreateButtonComponent, FormComponent],
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
