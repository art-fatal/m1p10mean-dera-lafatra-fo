import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Page} from "src/app/modules/datatable/models/page";
import {PagedData} from "src/app/modules/datatable/models/page-data";

import data from 'src/assets/data/company.json';
import {Staff} from "src/app/models/staff";

@Injectable({
  providedIn: 'root'
})
export class MockServerResultService {
  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getPageResults(page: Page): Observable<PagedData<Staff>> {
    return of(data)
        .pipe(map(d => this.getPagedData(page)))
        .pipe(delay(5000 * Math.random()));
  }

  /**
   * Package data into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from data
   * @returns {PagedData<Staff>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<Staff> {
    const pagedData = new PagedData<Staff>();
    page.totalElements = data.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = data[i];
      const employee = new Staff(jsonObj.name);
      pagedData.data.push(employee);
    }
    pagedData.page = page;
    console.log(pagedData)
    return pagedData;
  }
}
