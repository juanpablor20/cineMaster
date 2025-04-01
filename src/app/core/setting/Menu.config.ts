// menu.config.ts

import { MenuSection } from "../interface/menu.model";

export const MENU_CONFIG: MenuSection[] = [
  {
    sectionTitle: 'ADMIN',
    items: [
      {
        path: 'usuarios',
        title: 'Usuarios',
        icon: 'ri-user-line'
      },
      {
        path: 'cinemas',
        title: 'Cines',
        icon: 'ri-movie-2-line'
      },
      {
        path: 'peliculas',
        title: 'Películas',
        icon: 'ri-film-line'
      },
      {
        path: 'salas',
        title: 'Salas',
        icon: 'ri-calendar-event-line'
      },
      {
        path: 'screening',
        title: 'Proyecciones',
        icon: 'ri-calendar-check-line'
      },
    
      // ... más items
    ]
  }

];