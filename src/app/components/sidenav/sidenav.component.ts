import { Component, Input } from '@angular/core';
import { DASHBOARD_ROUTES } from '../../dashboard/dashboard.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuSection } from '../../core/interface/menu.model';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() isOpen: boolean = true;
  
  
  menuSections: MenuSection[];

  constructor(private menuService: MenuService) {
    this.menuSections = this.menuService.getMenuItems();
  }
}

