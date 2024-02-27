import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg-2";
import { RouterModule, Routes } from "@angular/router";
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { TranslationModule } from "../../modules/i18n";
import { LayoutComponent } from "./layout.component";
import { ExtrasModule } from "../partials";
import { AsideComponent } from "./components/aside/aside.component";
import { HeaderComponent } from "./components/header/header.component";
import { ContentComponent } from "./components/content/content.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ScriptsInitComponent } from "./components/scripts-init/scripts-init.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { AsideMenuComponent } from "./components/aside/aside-menu/aside-menu.component";
import { TabsAsideComponent } from "./components/aside/tabs-aside/tabs-aside.component";
import { TabsAsideInnerComponent } from "./components/aside/tabs-aside/tabs-aside-inner.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { PageTitleComponent } from "./components/header/page-title/page-title.component";
import { HeaderMenuComponent } from "./components/header/header-menu/header-menu.component";
import {
  DrawersModule,
  DropdownMenusModule,
  ModalsModule,
  EngagesModule, WidgetsModule,
} from "../partials";
import { EngagesComponent } from "../partials/layout/engages/engages.component";
import { AuthorsTabComponent } from "./components/aside/tabs/authors-tab/authors-tab.component";
import { MenuTabComponent } from "./components/aside/tabs/menu-tab/menu-tab.component";
import { NotificationsTabComponent } from "./components/aside/tabs/notifications-tab/notifications-tab.component";
import { ProjectsTabComponent } from "./components/aside/tabs/projects-tab/projects-tab.component";
import { SubscriptionsTabComponent } from "./components/aside/tabs/subscriptions-tab/subscriptions-tab.component";
import { TasksTabComponent } from "./components/aside/tabs/tasks-tab/tasks-tab.component";
import { SearchComponent } from "./components/aside/tabs/projects-tab/search/search.component";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ThemeModeModule } from "../partials/layout/theme-mode-switcher/theme-mode.module";
import {AuthGuard} from "../../modules/auth/services/guard/auth.guard";
import {StaffGuard} from "../../modules/auth/services/guard/staff.guard";
import {ManagerGuard} from "../../modules/auth/services/guard/manager.guard";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: 'staff',
        canActivate: [StaffGuard],
        loadChildren: () =>
            import('../../modules/staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: 'manager',
        canActivate: [ManagerGuard],
        loadChildren: () =>
            import('../../modules/manager/manager.module').then((m) => m.ManagerModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
            import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: '',
        loadChildren: () =>
            import('../../modules/customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: "**",
        redirectTo: "error/404",
      },
    ],
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    EngagesComponent,
    TabsAsideComponent,
    TabsAsideInnerComponent,
    AuthorsTabComponent,
    MenuTabComponent,
    NotificationsTabComponent,
    ProjectsTabComponent,
    SubscriptionsTabComponent,
    TasksTabComponent,
    SearchComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    ModalsModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    NgbTooltipModule,
    TranslateModule,
    FormsModule,
    ThemeModeModule,
      WidgetsModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {}
