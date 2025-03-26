import { Routes } from "@angular/router";





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
                path: 'crear-cine',
                title: 'crear Cine',
                loadComponent: () => import('../components/cinemas/form/form.component'),
            },
            {
                path: 'editar-cine/:id',
                title: 'editar Cine',
                loadComponent: () => import('../components/cinemas/form/form.component'),
            },
            

            {
                path: 'cinemas',
                title: 'cines',
             //   icon: 'ri-movie-2-line',
                loadComponent: () => import('./pages/cinemas/cinemas.component'),
            }
        ],

    },
   
]






    
         
         
         




