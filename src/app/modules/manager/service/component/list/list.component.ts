import {Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  swalOptions: SweetAlertOptions = { buttonsStyling: false };

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  constructor(private toolbarAction: ToolbarActionService) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
  }

  fireDelete(id: number) {
    this.deleteSwal.fire().then((clicked) => {
      if (clicked.isConfirmed) {
        this.successSwal.fire();
      }
    });  }
}
