import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  private toastDisplayed = new Subject<Toast>();
  private toasts: Toast[] = [];
  private toastSubject = new Subject<Toast[]>();
  toasts$ = this.toastSubject.asObservable();
  toastDisplayed$ = this.toastDisplayed.asObservable();

  displayToast(toast: Toast) {
    this.toasts.push(toast);
    this.toastSubject.next(this.toasts);

    setTimeout(() => {
      this.hideToast(this.toasts[this.toasts.length - 1]);
    }, toast.time);
  }

  hideToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
    this.toastSubject.next(this.toasts);
  }
}
