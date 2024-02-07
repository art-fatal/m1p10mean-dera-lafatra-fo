import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LayoutService, PageInfoService } from "../../_metronic/layout";
import {ILayout} from "../../_metronic/layout/core/default-layout.config";

type Tabs = "Header" | "Toolbar" | "PageTitle" | "Aside" | "Content" | "Footer";

@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
})
export class ManagerComponent implements OnInit {
  activeTab: Tabs = "Header";
  model: ILayout;
  @ViewChild("form", { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  constructor(
    private layout: LayoutService,
    private pageInfo: PageInfoService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.model.content.width = 'fluid';
    this.model.header.width = 'fluid';
    this.layout.updateConfig(this.model);
    this.pageInfo.updateBreadcrumbs([]);
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }
}
