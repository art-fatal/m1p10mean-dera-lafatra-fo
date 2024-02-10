import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ToolbarActionService {
    private componentSource = new BehaviorSubject<any>(null);
    currentComponent = this.componentSource.asObservable();

    constructor(private router: Router) {
        // Écoutez les événements de navigation
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            // Réinitialiser le composant à chaque début de navigation
            this.changeComponent(null);
        });
    }


    changeComponent(component: any) {
        this.componentSource.next(component);
    }

}
