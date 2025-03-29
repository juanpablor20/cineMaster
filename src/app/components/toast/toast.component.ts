import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,  } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

}

