import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Utils } from './utils.class';

export class CustomValidation {
  // Recibe fecha en formato yyyy-MM-dd
  static minDate(control: AbstractControl<string>): ValidationErrors | null {
    const todaysDate = new Date();
    const controlDate = Utils.getDateObjFromString(control.value);
    todaysDate.setHours(0, 0, 0, 0);
    controlDate.setHours(0, 0, 0, 0);
    if (controlDate >= todaysDate) {
      return null;
    } else {
      return { minDate: true };
    }
  }
}
