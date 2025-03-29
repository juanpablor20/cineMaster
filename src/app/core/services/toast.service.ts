
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export type AlertType = 'success' | 'error' | 'warning' | 'info';
export interface Toast{
  message: string;
  type: AlertType;
}
@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private toastSubject = new Subject<Toast>();
 private timeout = 5000;

 getToast(): Observable<Toast>{
  return this.toastSubject.asObservable();
 }  
 success(message: string, timeout?: number): void {
  this.showAlert(message, 'success', timeout);
 }

  error(message: string, timeout?: number): void {
    this.showAlert(message, 'error', timeout);
  }

  warning(message: string, timeout?: number): void {
    this.showAlert(message, 'warning', timeout);
  }

  info(message: string, timeout?: number): void {
    this.showAlert(message, 'info', timeout);
  }

  private showAlert(message: string, type: AlertType, timeout?: number): void {
    this.toastSubject.next({ message, type });
    
    // Limpiar la alerta después del tiempo especificado
    setTimeout(() => {
      this.clear();
    }, timeout || this.timeout);
  }

  clear(): void {
    this.toastSubject.next({ message: '', type: 'success' });
  }

}


