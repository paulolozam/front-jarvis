import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],   // ← protege todo el shell
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'alertas',
        loadComponent: () =>
          import('./features/alertas/alertas.component')
            .then(m => m.AlertasComponent)
      },
      {
        path: 'estaciones',
        loadComponent: () =>
          import('./features/estaciones/estaciones.component')
            .then(m => m.EstacionesComponent)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/usuarios.component')
            .then(m => m.UsuariosComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
