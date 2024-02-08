import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NavigationCancel, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LayoutService } from "../../core/layout.service";
import { MenuComponent } from "../../../kt/components";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerContainerCssClasses: string = "";
  showHeaderMenu: boolean = false;
  @ViewChild("ktPageTitle", { static: true }) ktPageTitle: ElementRef;

  private unsubscribe: Subscription[] = [];

  constructor(private layout: LayoutService, private router: Router) {
    this.routingChanges();

    const layoutSubscriber = this.layout.layoutConfigSubject.asObservable().subscribe(() => {
      this.buildView()
    })

    this.unsubscribe.push(layoutSubscriber)
  }

  ngOnInit(): void {
    this.buildView()
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  private buildView() {
    this.headerContainerCssClasses = this.layout.getStringCSSClasses("headerContainer");
    const headerMenu = this.layout.getProp("header.menu") as
        | boolean
        | undefined;
    if (headerMenu) {
      this.showHeaderMenu = true;
    }
  }
}
