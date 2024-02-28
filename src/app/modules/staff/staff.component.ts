import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LayoutService, PageInfoService } from "../../_metronic/layout";
import {ILayout} from "../../_metronic/layout/core/default-layout.config";

type Tabs = "Header" | "Toolbar" | "PageTitle" | "Aside" | "Content" | "Footer";

@Component({
  selector: "app-builder",
  templateUrl: "./staff.component.html",
})
export class StaffComponent implements OnInit {
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
    this.updateLayoutConfig();
    this.pageInfo.updateBreadcrumbs([]);
  }

  updateLayoutConfig(){
    this.model = this.layout.getConfig();
    this.model.content.width = 'fixed';
    this.model.header.width = 'fixed';
    this.model.header.menu = false;
    this.model.aside.display = false;
    this.layout.setConfig(this.model);
  }
  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }
}
