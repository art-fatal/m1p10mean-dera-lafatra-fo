import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
} from '@angular/router';
import { AuthService } from '../auth.service';
import {Roles} from "../../../../enums/user/roles.enum";

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isGranted(Roles.MANAGER)) {
      return true;
    }

    // not logged in so redirect to 403 page with the return url
    this.router.navigate(['/auth/403']);
    return false;
  }
}
