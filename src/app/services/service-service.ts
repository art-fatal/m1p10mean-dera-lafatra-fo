import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {mapToClientModel, mapToServerModel} from "./mapping.service";
import {HttpService} from "./http.service";
import {ServiceModel} from "../models/service.model";
import ServiceMapping from "../mappings/service.mapping";
import {AuthService} from "../modules/auth";

@Injectable({
    providedIn: 'root',
})
export class ServiceService extends HttpService<ServiceModel, any> {

    constructor(http: HttpClient, authService: AuthService) {
        super(http, "services", authService)
    }

    protected mapToClientModel(serverModel: any): ServiceModel {
        return mapToClientModel<ServiceModel>(serverModel, ServiceMapping);
    }

    protected mapToServerModel(clientModel: ServiceModel): any {
        return mapToServerModel(clientModel, ServiceMapping)
    }
}