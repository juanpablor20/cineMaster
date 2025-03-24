import { Component, signal } from '@angular/core';
import { DASHBOARD_ROUTES } from '../../dashboard/dashboard.routes';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // public showContent = signal(false);
  // public toggleContent() {
  //   this.showContent.update( value => !value );

//  }
  public menuItems = DASHBOARD_ROUTES
 
    .map( route => route.children ?? [])
    .flat()
    .filter( route => route && route.path)
   .filter( route => !route.path?.includes(':'))
   

  constructor() {


  
  }
}
