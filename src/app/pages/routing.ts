import { Routes } from "@angular/router"

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
