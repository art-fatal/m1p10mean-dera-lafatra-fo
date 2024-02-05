import { Routes } from "@angular/router";
import {AuthGuard} from "../modules/auth/services/auth.guard";

const Routing: Routes = [
  {
    path: 'staff',
    loadChildren: () =>
        import('../modules/staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'manager',
    loadChildren: () =>
        import('../modules/manager/manager.module').then((m) => m.ManagerModule),
  },
  {
    path: '',
    loadChildren: () =>
        import('../modules/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: "**",
    redirectTo: "error/404",
  },
];

export { Routing };
