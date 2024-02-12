import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarActionService} from "../../../../../_metronic/layout/core/toolbar-action.service";
import {CreateButtonComponent} from "./create-button/create-button.component";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SweetAlertOptions} from "sweetalert2";
import {MockServerResultService} from "../../../../datatable/services/mock-server/mock-server-result.service";
import {Page} from "../../../../datatable/models/page";
import {Staff} from "../../../../../models/staff";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {ColumnConfig, DynamicTableComponent} from "material-dynamic-table";
import {FilteredDataSource} from "../../../../datatable/data-source/filter-data-source";

@Component({
  selector: 'app-list',
  providers: [MockServerResultService],
  templateUrl: './list.component.html',
  styleUrls: [
      './list.component.scss',
  ]
})
export class ListComponent implements OnInit{
  swalOptions: SweetAlertOptions = { buttonsStyling: false };

  columns: ColumnConfig[] = [
    {
      name: 'product',
      displayName: 'Product',
      type: 'string'
    },
    {
      name: 'description',
      displayName: 'Description',
      type: 'string'
    },
    {
      name: 'category',
      displayName: 'Category',
      type: 'string',
    },
    {
      name: 'recievedOn',
      displayName: 'Recieved On',
      type: 'date'
    },
    {
      name: 'created',
      displayName: 'Created Date',
      type: 'date',
      options: {
        dateFormat: 'shortDate'
      }
    },
    {
      name: '',
      type: 'options'
    }
  ];

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  @ViewChild(DynamicTableComponent) dynamicTable: DynamicTableComponent;

  page = new Page();
  rows = new Array<Staff>();

  columnMode = ColumnMode;

  constructor(private toolbarAction: ToolbarActionService,private serverResultsService: MockServerResultService,private changeDetectorRef: ChangeDetectorRef) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  data: Staff[] = [
    {
      name: 'Mouse',
      description: 'Fast and wireless',
      category: 'Peripherals',
      recievedOn: new Date('2018-01-02T11:05:53.212Z'),
      created: new Date('2015-04-22T18:12:21.111Z')
    },
    {
      name: 'Keyboard',
      description: 'Loud and Mechanical',
      category: 'Peripherals',
      recievedOn: new Date('2018-06-09T12:08:23.511Z'),
      created: new Date('2015-03-11T11:44:11.431Z')
    },
    {
      name: 'Laser',
      description: 'It\'s bright',
      category: 'Space',
      recievedOn: new Date('2017-05-22T18:25:43.511Z'),
      created: new Date('2015-04-21T17:15:23.111Z')
    },
    {
      name: 'Baby food',
      description: 'It\'s good for you',
      category: 'Food',
      recievedOn: new Date('2017-08-26T18:25:43.511Z'),
      created: new Date('2016-01-01T01:25:13.055Z')
    },
    {
      name: 'Coffee',
      description: 'Prepared from roasted coffee beans',
      category: 'Food',
      recievedOn: new Date('2015-04-16T23:52:23.565Z'),
      created: new Date('2016-12-21T21:05:03.253Z')
    },
    {
      name: 'Cheese',
      description: 'A dairy product',
      category: 'Food',
      recievedOn: new Date('2017-11-06T21:22:53.542Z'),
      created: new Date('2014-02-11T11:34:12.442Z')
    }
  ];

  dataSource = new FilteredDataSource<Staff>(this.data);

  ngOnInit() {
    this.toolbarAction.changeComponent(CreateButtonComponent);
    // this.setPage({ offset: 0 });
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
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.changeDetectorRef.detectChanges(); // Force la détection de changement
    });
  }
}
