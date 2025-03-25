import { Component, Input } from '@angular/core';
import { DASHBOARD_ROUTES } from '../../dashboard/dashboard.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,  // Añadido para componentes modernos
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() isOpen: boolean = true;
  
  public menuItems = DASHBOARD_ROUTES
    .map(route => route.children ?? [])
    .flat()
    .filter(route => route && route.path)
    .filter(route =>
       !route.path?.includes(':') &&
       !route.path?.includes('crear-')
      );
}

