// src/app/shell/shell.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ShellComponent {
  navItems = [
    { label: 'Dashboard',   icon: 'dashboard',      route: '/dashboard'   },
    { label: 'Alertas',     icon: 'notifications',  route: '/alertas'     },
    { label: 'Estaciones',  icon: 'developer_board', route: '/estaciones' },
    { label: 'Usuarios',    icon: 'people',         route: '/usuarios'    },
    { label: 'Reportes',    icon: 'bar_chart',      route: '/reportes'    },
  ];

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
