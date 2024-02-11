import {Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";
import {MockServerResultService} from "../../../../datatable/services/mock-server/mock-server-result.service";
import {Page} from "../../../../datatable/models/page";
import {Staff} from "../../../../../models/staff";
import {ColumnMode} from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-list',
  providers: [MockServerResultService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  swalOptions: SweetAlertOptions = { buttonsStyling: false };
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;
  page = new Page();
  rows = new Array<Staff>();

  message: string = 'hhhee'
  columnMode = ColumnMode;

  constructor(private toolbarAction: ToolbarActionService,private serverResultsService: MockServerResultService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
    this.setPage({ offset: 0 });
  }

  fireDelete(id: number) {
    this.deleteSwal.fire().then((clicked) => {
      if (clicked.isConfirmed) {
        this.successSwal.fire();
      }
    });
  }

  /**
   * Populate the table with new data based on the page number
   * @param pageInfo
   */
  setPage(pageInfo: { offset: any; }) {
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getPageResults(this.page). subscribe((pagedData: { page: Page; data: Staff[]; }) => {
      console.log('server result')
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.message = 'ffffffff'
      console.log(this.rows )
    });
  }

  changeMessage(){
    this.message +='cccccc'
  }
}
