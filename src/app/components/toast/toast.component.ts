import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from 'src/app/models/toast.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast$: Observable<Toast[]>;

  constructor(toastService: ToastService) {
    this.toast$ = toastService.toasts$;
  }
}
