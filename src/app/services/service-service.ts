import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {ServiceModel} from 'src/app/models/service.model';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export type ServiceType = ServiceModel | undefined;
const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class ServiceService {
    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    // public fields
    current$: Observable<ServiceType>;
    collection$: Observable<Array<ServiceType>>;
    isLoading$: Observable<boolean>;
    currentSubject: BehaviorSubject<ServiceType>;
    collectionSubject: BehaviorSubject<Array<ServiceType>>;
    isLoadingSubject: BehaviorSubject<boolean>;
    resource: string;


    get apiUrl(): string {
        return `${API_USERS_URL}/${this.resource}`;
    }

    get collectionValue(): Array<ServiceType> {
        return this.collectionSubject.value;
    }

    get collectionLength(): number {
        return this.collectionSubject.value.length;
    }

    get currentValue(): ServiceType {
        return this.currentSubject.value;
    }

    set currentValue(object: ServiceType) {
        this.currentSubject.next(object);
    }

    constructor(private http: HttpClient) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentSubject = new BehaviorSubject<ServiceType>(undefined);
        this.collectionSubject = new BehaviorSubject<Array<ServiceType>>([]);
        this.current$ = this.currentSubject.asObservable();
        this.collection$ = this.collectionSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        this.resource = "services";
    }

    // public methods
    getList(params: any): Observable<ServiceModel[]> {
        this.isLoadingSubject.next(true);
        return this.http.get<ServiceModel[]>(this.apiUrl, {params}).pipe(
            map((data: ServiceModel[]) => {
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
}