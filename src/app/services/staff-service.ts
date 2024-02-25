import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import { StaffModel} from 'src/app/models/staff.model';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {mapToClientModel, mapToServerModel} from "./mapping.service";
import StaffMapping from "../mappings/staff.mapping";

export type StaffType = StaffModel | undefined;
const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class StaffService {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    // public fields
    current$: Observable<StaffType>;
    collection$: Observable<Array<StaffType>>;
    isLoading$: Observable<boolean>;
    currentSubject: BehaviorSubject<StaffType>;
    collectionSubject: BehaviorSubject<Array<StaffType>>;
    isLoadingSubject: BehaviorSubject<boolean>;
    resource: string;


    get apiUrl(): string {
        return `${API_USERS_URL}/${this.resource}`;
    }

    get collectionValue(): Array<StaffType> {
        return this.collectionSubject.value;
    }

    get collectionLength(): number {
        return this.collectionSubject.value.length;
    }

    get currentValue(): StaffType {
        return this.currentSubject.value;
    }

    set currentValue(object: StaffType) {
        this.currentSubject.next(object);
    }

    constructor(private http: HttpClient) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentSubject = new BehaviorSubject<StaffType>(undefined);
        this.collectionSubject = new BehaviorSubject<Array<StaffType>>([]);
        this.current$ = this.currentSubject.asObservable();
        this.collection$ = this.collectionSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        this.resource = "users";
    }

    // public methods
    collection(params: any): Observable<StaffModel[]> {
        this.isLoadingSubject.next(true);
        return this.http.get<StaffModel[]>(this.apiUrl, {params}).pipe(
            map((responseData: Array<any>) => {
                const data = responseData.map(serverModel => mapToClientModel<StaffModel>(serverModel, StaffMapping));
                this.collectionSubject.next(data)
                return data;
            }),
            catchError((err) => {
                console.error('err', err);
                return of([]);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
        }));
    }

    post(data: StaffModel): Observable<StaffType> {
        this.isLoadingSubject.next(true);
        const serverData = mapToServerModel(data,StaffMapping)
        return this.http.post<StaffModel>(this.apiUrl, serverData).pipe(
            map((responseData: any) => {
                const data:StaffModel = mapToClientModel(responseData, StaffMapping)
                this.currentSubject.next(data)
                return data;
            }),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
        }));
    }

    put(objectId:string, data: StaffModel): Observable<StaffType> {
        this.isLoadingSubject.next(true);
        const serverData = mapToServerModel(data,StaffMapping)
        return this.http.put<StaffModel>(`${this.apiUrl}/${objectId}`, serverData).pipe(
            map((responseData: any) => {
                const data:StaffModel = mapToClientModel(responseData, StaffMapping)
                this.currentSubject.next(data)
                return data;
            }),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
        }));
    }
}