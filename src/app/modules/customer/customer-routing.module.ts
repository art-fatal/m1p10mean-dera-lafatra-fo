import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {AppointmentHistoryComponent} from "./appointment-history/appointment-history.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'appointments',
                component: AppointmentHistoryComponent,
            },
            {path: "", redirectTo: "home", pathMatch: "full"},
            {path: "**", redirectTo: "home", pathMatch: "full"},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerRoutingModule {
}
