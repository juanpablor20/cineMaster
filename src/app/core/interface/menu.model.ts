// menu.model.ts
export interface MenuItem {
    path: string;
    title: string;
    icon: string;
    children?: MenuItem[];
  }
  
  export interface MenuSection {
    sectionTitle?: string;
    items: MenuItem[];
  }