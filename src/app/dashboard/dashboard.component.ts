import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';

import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ SidenavComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {
  isSidenavOpen = true;
  
}
