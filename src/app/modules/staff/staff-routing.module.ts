import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {StaffComponent} from "./staff.component";

const routes: Routes = [
    {
        path: '',
        component: StaffComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {path: "", redirectTo: "dashboard", pathMatch: "full"},
            {path: "**", redirectTo: "dashboard", pathMatch: "full"},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StaffRoutingModule {
}
