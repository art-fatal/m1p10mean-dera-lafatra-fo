import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {mapToServerModel} from "./mapping.service";
import {AuthService} from "../modules/auth";

const API_USERS_URL = `${environment.apiUrl}`;

export abstract class HttpService<TModel, TServerModel> {
    protected unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    // public fields
    current$: Observable<TModel | undefined>;
    collection$: Observable<Array<TModel>>;
    isLoading$: Observable<boolean>;
    currentSubject: BehaviorSubject<TModel | undefined>;
    collectionSubject: BehaviorSubject<Array<TModel>>;
    isLoadingSubject: BehaviorSubject<boolean>;
    protected httpHeaders: HttpHeaders;
    protected defaultOptions: { headers: any };

    get apiUrl(): string {
        return `${API_USERS_URL}/${this.resource}`;
    }

    get collectionValue(): Array<TModel> {
        return this.collectionSubject.value;
    }

    get collectionLength(): number {
        return this.collectionSubject.value.length;
    }

    get currentValue(): TModel | undefined {
        return this.currentSubject.value;
    }

    set currentValue(object: TModel | undefined) {
        this.currentSubject.next(object);
    }

    protected constructor(protected http: HttpClient, public resource: string, private authService: AuthService) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentSubject = new BehaviorSubject<TModel | undefined>(undefined);
        this.collectionSubject = new BehaviorSubject<Array<TModel>>([]);
        this.current$ = this.currentSubject.asObservable();
        this.collection$ = this.collectionSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        this.httpHeaders = new HttpHeaders();

        const auth = this.authService.getAuthFromLocalStorage();
        if (auth && auth.token) {
            this.httpHeaders = this.httpHeaders.set('Authorization', `Bearer ${auth.token}`)
        }

        this.defaultOptions = {headers: this.httpHeaders}
    }

    // public methods
    collection(params: any): Observable<TModel[]> {
        this.isLoadingSubject.next(true);
        return this.http.get<TModel[]>(this.apiUrl, {params, ...this.defaultOptions}).pipe(
            map((responseData: Array<any>) => {
                const data = responseData.map(serverModel => this.mapToClientModel(serverModel));
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

    post(data: TModel): Observable<TModel | undefined> {
        this.isLoadingSubject.next(true);
        const serverModel = this.mapToServerModel(data)
        return this.http.post<TModel>(this.apiUrl, serverModel, this.defaultOptions).pipe(
            map((responseData: any) => {
                const clientData = this.mapToClientModel(responseData);
                this.currentSubject.next(clientData)
                return clientData;
            }),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
            }));
    }

    put(objectId: string, data: TModel): Observable<TModel | undefined> {
        this.isLoadingSubject.next(true);
        const serverModel = this.mapToServerModel(data)
        return this.http.put<TModel>(`${this.apiUrl}/${objectId}`, serverModel, this.defaultOptions).pipe(
            map((responseData: any) => {
                const clientData = this.mapToClientModel(responseData);
                this.currentSubject.next(clientData)
                return clientData;
            }),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => {
                this.isLoadingSubject.next(false);
            }));
    }

    protected abstract mapToClientModel(serverModel: TServerModel): TModel

    protected abstract mapToServerModel(clientModel: TModel): TServerModel
}