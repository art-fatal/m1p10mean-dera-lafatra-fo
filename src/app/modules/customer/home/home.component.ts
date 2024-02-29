import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarActionService} from "../../../_metronic/layout/core/toolbar-action.service";
import {FilterButtonComponent} from "./filter-button/filter-button.component";
import {ServiceService} from "../../../services/service-service";
import {Subscription} from "rxjs";
import {ServiceModel} from "../../../models/service.model";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit{
  private unsubscribe: Subscription[] = [];

  serviceCollection: Array<ServiceModel>;

  constructor(
      private toolbarAction: ToolbarActionService,
      private modalService: NgbModal,
      private service: ServiceService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(FilterButtonComponent);
  }


  ngAfterViewInit() {
    const postCollectionSubscr = this.service.collection().subscribe();

    const collectionSubscr = this.service.collection$.subscribe(data => {
      this.serviceCollection = data
      this.cdr.detectChanges();
    });

    this.unsubscribe.push(collectionSubscr)
    this.unsubscribe.push(postCollectionSubscr)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  toggleFavorite(event: MouseEvent, service: ServiceModel) {
    event.stopImmediatePropagation();
    // Logique supplémentaire pour le bouton ici
    console.log('Bouton cliqué, lien parent non activé');
  }
}
