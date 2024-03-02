import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {mapToClientModel, mapToServerModel} from "./mapping.service";
import {HttpService} from "./http.service";
import {AuthService} from "../modules/auth";
import {ExpenseModel} from "../models/expense.model";
import ExpenseMapping from "../mappings/expense.mapping";

@Injectable({
    providedIn: 'root',
})
export class ExpenseService extends HttpService<ExpenseModel, any> {

    constructor(http: HttpClient, authService: AuthService) {
        super(http, "depenses", authService)
    }

    protected mapToClientModel(serverModel: any): ExpenseModel {
        return mapToClientModel<ExpenseModel>(serverModel, ExpenseMapping);
    }

    protected mapToServerModel(clientModel: ExpenseModel): any {
        return mapToServerModel(clientModel, ExpenseMapping)
    }
}