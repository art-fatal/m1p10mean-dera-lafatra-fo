import {Component, OnInit} from '@angular/core';
import {ToolbarActionService} from "../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  constructor(private toolbarAction: ToolbarActionService) {}

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
  }
}
