import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {StaffService} from "../../../../../services/staff-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StaffModel} from "../../../../../models/staff.model";

@Component({
    selector: 'app-manager-staff-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    formGroup: FormGroup;
    isEdit: boolean;
    private unsubscribe: Subscription[] = [];

    @ViewChild('closeButton') closeButtonRef: ElementRef;

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
    ) {
        const loadingSubscr = this.staffService.isLoading$
            .subscribe((res) => (this.isLoading = res));
        const currentSubscr = this.staffService.currentSubject
            .asObservable()
            .subscribe((res) => {
                if (res) {
                    this.isEdit = true
                    this.formGroup.patchValue(res)
                    this.staffService.isLoadingSubject.next(false)
                }
            });
        this.unsubscribe.push(loadingSubscr);
        this.unsubscribe.push(currentSubscr);
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            // const idToEdit = this.route.snapshot.paramMap.get('id')
            const idToEdit = this.staffService.currentValue?.id

            if (this.isEdit && idToEdit){
                this.staffService.put(idToEdit,this.formGroup.value).subscribe({
                    next: () => {
                        this.afterSubmit()
                    },
                    error: (error) => console.error('There was an error!', error)
                });
            }else{
                this.staffService.post(this.formGroup.value).subscribe({
                    next: () => {
                        this.afterSubmit()
                    },
                    error: (error) => console.error('There was an error!', error)
                });
            }
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    afterSubmit()  {
        this.formGroup.reset()
        this.staffService.collection().subscribe()
        this.closeButtonRef.nativeElement.click();
    }
}
