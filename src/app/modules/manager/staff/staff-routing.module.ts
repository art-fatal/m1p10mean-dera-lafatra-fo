import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StaffComponent} from "./staff.component";
import {ListComponent} from "./list/list.component";
import {WidgetsModule} from "../../../_metronic/partials";

const routes: Routes = [
    {
        path: '',
        component: StaffComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [ListComponent],
    imports: [
        RouterModule.forChild(routes),
        WidgetsModule,
    ],
    exports: [RouterModule],
})
export class StaffRoutingModule {
}
