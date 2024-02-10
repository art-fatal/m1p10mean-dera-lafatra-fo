import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {StaffRoutingModule} from "./staff-routing.module";
import {StaffComponent} from "./staff.component";

@NgModule({
  declarations: [StaffComponent],
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    StaffRoutingModule
  ],
})
export class StaffModule {}
