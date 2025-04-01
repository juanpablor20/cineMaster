import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastComponent } from '../components/toast/toast.component';
import { Toast, ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, NavbarComponent, CommonModule, RouterModule, ToastComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  isSidenavOpen = true;
  toast: Toast = {message: '', type: 'success'};

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe((toast: Toast) => {
      this.toast = toast;
    });
  }

  onToastClosed(): void {
    this.toastService.clear();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}