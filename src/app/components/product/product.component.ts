import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidation } from 'src/app/models/custom-validators.class';
import { Toast } from 'src/app/models/toast.model';
import { Utils } from 'src/app/models/utils.class';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnDestroy {
  form = new FormGroup({
    id: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    }),
    logo: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date_release: new FormControl<string>('', {
      nonNullable: true,
      validators: [CustomValidation.minDate],
    }),
    date_revision: new FormControl<string>(
      { value: '', disabled: true },
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
  });
  todaysDate = new Date();
  sub!: Subscription;

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  onReleaseDateChange(e: any) {
    // Fecha en formate yyyy-MM-DD
    const stringDate: string = e.target.value;
    if (stringDate) {
      const releaseDate = Utils.getDateObjFromString(stringDate);
      const revisionDate = new Date(releaseDate);
      revisionDate.setFullYear(releaseDate.getFullYear() + 1);
      const revisionDateString = Utils.getformattedDateString(revisionDate);
      this.form.controls.date_revision.setValue(revisionDateString);
    }
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    this.sub = this.productService.saveProduct(formValue).subscribe({
      next: () => {
        this.toastService.displayToast(
          new Toast('Producto guardado exitosamente', 'success')
        );
        this.form.reset();
      },
      error: (err: string) => {
        this.toastService.displayToast(new Toast(err, 'error'));
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
