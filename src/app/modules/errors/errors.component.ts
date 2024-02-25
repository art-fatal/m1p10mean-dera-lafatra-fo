import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../../_metronic/kt/components';
import {Roles} from "../../enums/user/roles.enum";
import {AuthService} from "../auth";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @HostBinding('class') class = 'd-flex flex-column flex-root';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  routeToDashboard() {
    if (this.authService.isGranted(Roles.MANAGER)) {
      this.router.navigate(['/manager']);
    } else if (this.authService.isGranted(Roles.STAFF)) {
      this.router.navigate(['/staff'])
    } else {
      this.router.navigate(['/']);
    }
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, 200);
  }
}
