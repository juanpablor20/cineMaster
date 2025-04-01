// menu.service.ts
import { Injectable } from '@angular/core';
import { MENU_CONFIG } from '../setting/Menu.config';
import { MenuItem, MenuSection } from '../interface/menu.model';
import { Routes } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  getMenuItems(): MenuSection[] {
    return MENU_CONFIG;
  }

  getFlatMenuItems(): MenuItem[] {
    return MENU_CONFIG.flatMap(section => section.items);
  }


validateRoutes(routes: Routes): void {
    const menuPaths = this.getFlatMenuItems().map(item => item.path);
    const routePaths = routes.flatMap(r => r.path || '');
  
    const missingInMenu = routePaths.filter(p => !menuPaths.includes(p));
    const missingInRoutes = menuPaths.filter(p => !routePaths.includes(p));
  
    if (missingInMenu.length) {
      console.warn('Routes without menu items:', missingInMenu);
    }
  
    if (missingInRoutes.length) {
      console.warn('Menu items without routes:', missingInRoutes);
    }
  }
}