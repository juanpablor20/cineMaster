import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component'),
    children: [
      {
        path: 'usuarios',
        title: 'usuarios',
        //   icon: 'ri-user-line',
        loadComponent: () => import('./pages/users/users.component'),
      },
      {
        path: 'cinemas',
        title: 'cines',
        //   icon: 'ri-movie-2-line',
        loadComponent: () => import('./pages/cinemas/cinemas.component'),
      },
      {
        path: 'crear-cine',
        title: 'crear Cine',
        loadComponent: () =>
          import('../components/cinemas/form/form.component'),
      },
      {
        path: 'editar-cine/:id',
        title: 'editar Cine',
        loadComponent: () =>
          import('../components/cinemas/form/form.component'),
      },
      {
        path: 'editar-pelicula/:id',
        title: 'Editar Pelicula',
        loadComponent: () =>
          import('../components/movies/movie-form/movie-form.component'),
      },

      
      {
        path: 'peliculas',
        title: 'peliculas',
        loadComponent: () => import('./pages/movies/movies.component'),
      },
      {
        path: 'crear-peliculas',
        title: 'Crear Peliculas',
        loadComponent: () =>
          import('../components/movies/movie-form/movie-form.component'),
      },
      {
        path: 'salas',
        title: 'Salas',
        loadComponent: () => import('./pages/rooms/rooms.component'),
      },
      {
        path: 'crear-salas',
        title: 'Crear salas',
        loadComponent: () => 
          import('../components/rooms/room-form/room-form.component')
      },
      {
        path: 'editar-sala/:id',
        title: 'Editar sala',
        loadComponent: () => 
          import('../components/rooms/room-form/room-form.component')
      },
      {
        path: 'screening',
        title: 'Proyecciones',
        loadComponent: () => import('./pages/screening/screening.component'),
      },
      {
        path: 'crear-screening',
        title: 'Crear Proyeccion',
        loadComponent: () => import('../components/screening/screening-form/screening-form.component'),
      },
      {
        path: 'editar-screening/:id',
        title: 'Editar Proyeccion',
        loadComponent: () => import('../components/screening/screening-form/screening-form.component'),
      }
    ],
  },
];
