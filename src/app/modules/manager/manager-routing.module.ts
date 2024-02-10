import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManagerComponent} from "./manager.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '',
        component: ManagerComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'staff',
                loadChildren: () =>
                    import('./staff/staff.module').then((m) => m.StaffModule),
            },
            {
                path: 'service',
                loadChildren: () =>
                    import('./service/service.module').then((m) => m.ServiceModule),
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
export class ManagerRoutingModule {
}
