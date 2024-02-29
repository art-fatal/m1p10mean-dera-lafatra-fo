import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaffComponent} from "./staff.component";
import {ListComponent} from "./component/list/list.component";
import {ExtrasModule, WidgetsModule} from "../../../_metronic/partials";
import {FormComponent} from "./component/form/form.component";
import {InlineSVGModule} from "ng-inline-svg-2";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
    {
        path: '',
        component: StaffComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
            },
            {
                path: 'add',
                component: FormComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ListComponent],
    imports: [
        RouterModule.forChild(routes),
        WidgetsModule,
        InlineSVGModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        ExtrasModule,
    ],
    exports: [RouterModule],
})
export class StaffRoutingModule {
}
