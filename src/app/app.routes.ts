import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  // {
  //     path:'dashboard', canActivate: [AuthGuard],
  //     loadChildren:() => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  // },
  //      {path: '**', component: PageNotFoundComponent}
];
