import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {StaffService, StaffType} from "../../../../../services/staff-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private staffService: StaffService
    ) {
        const loadingSubscr = this.staffService.isLoadingSubject
            .asObservable()
            .subscribe((res) => (this.isLoading = res));
        const currentSubscr = this.staffService.currentSubject
            .asObservable()
            .subscribe((res) => {
                if (res) {
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
            this.staffService.post(this.formGroup.value).subscribe({
                next: (staff: StaffType) => console.log('Staff created', staff),
                error: (error) => console.error('There was an error!', error)
            });
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
