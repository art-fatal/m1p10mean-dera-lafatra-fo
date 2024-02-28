import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../modules/auth";
import {UserModel} from "../../../../models/user.model";
import {LayoutService} from "../../core/layout.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
})
export class TopbarComponent implements OnInit{
  itemClass: string = "ms-1 ms-lg-2";
  btnClass: string =
    "btn btn-icon btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px";
  toolbarButtonIconSizeClass: string = "svg-icon-1";
  protected user: UserModel | undefined;
  protected searchDisplay: boolean;


  constructor(
      private layout: LayoutService,
      private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.auth.currentUserValue
    this.searchDisplay = this.layout.getProp("header.search") as boolean;

  }
}
