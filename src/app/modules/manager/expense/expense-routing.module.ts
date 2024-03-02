import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExpenseComponent} from "./expense.component";
import {ListComponent} from "./component/list/list.component";

const routes: Routes = [
    {
        path: '',
        component: ExpenseComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExpenseRoutingModule {
}
