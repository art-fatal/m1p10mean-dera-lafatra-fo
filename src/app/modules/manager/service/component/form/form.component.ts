import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../../../../services/service-service";
import {ServiceModel} from "../../../../../models/service.model";

@Component({
  selector: 'app-manager-service-form',
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
      private service: ServiceService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    const loadingSubscr = this.service.isLoadingSubject
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    const currentSubscr = this.service.currentSubject
        .asObservable()
        .subscribe((res) => {
          if (res) {
            this.isEdit = true
            this.formGroup.patchValue(res)
            this.service.isLoadingSubject.next(false)
          }
        });
    this.unsubscribe.push(loadingSubscr);
    this.unsubscribe.push(currentSubscr);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      commission: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // const idToEdit = this.route.snapshot.paramMap.get('id')
      const idToEdit = this.service.currentValue?.id

      if (this.isEdit && idToEdit){
        this.service.put(idToEdit,this.formGroup.value).subscribe({
          next: (model: ServiceModel | undefined) => console.log('Staff updated', model),
          error: (error) => console.error('There was an error!', error)
        });
      }else{
        this.service.post(this.formGroup.value).subscribe({
          next: (model: ServiceModel | undefined) => console.log('Staff created', model),
          error: (error) => console.error('There was an error!', error)
        });
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
