// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../core/services/api.service';

interface MetricCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface AlertaReciente {
  linea: string;
  estacion: string;
  tipo: string;
  estado: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatChipsModule
  ]
})
export class DashboardComponent implements OnInit {
  metrics = signal<MetricCard[]>([
    { label: 'Alertas activas',        value: 0, icon: 'notifications_active', color: 'danger'  },
    { label: 'Estaciones online',      value: 0, icon: 'developer_board',       color: 'success' },
    { label: 'Tiempo prom. respuesta', value: '-- min', icon: 'timer',          color: 'primary' },
    { label: 'Líneas activas',         value: 0, icon: 'linear_scale',          color: 'primary' },
  ]);

  alertas = signal<AlertaReciente[]>([]);
  displayedColumns = ['linea', 'estacion', 'tipo', 'estado'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cuando tengas los endpoints listos, reemplaza con llamadas reales:
    // this.api.get<any>('andon/dashboard/').subscribe(...)

    // Por ahora datos de prueba
    this.alertas.set([
      { linea: 'Línea A', estacion: 'Est. 03', tipo: 'Paro',     estado: 'Activa'      },
      { linea: 'Línea B', estacion: 'Est. 07', tipo: 'Calidad',  estado: 'En atención' },
      { linea: 'Línea C', estacion: 'Est. 01', tipo: 'Material', estado: 'Resuelta'    },
    ]);

    this.metrics.set([
      { label: 'Alertas activas',        value: 3,        icon: 'notifications_active', color: 'danger'  },
      { label: 'Estaciones online',      value: 12,       icon: 'developer_board',      color: 'success' },
      { label: 'Tiempo prom. respuesta', value: '4.2 min', icon: 'timer',               color: 'primary' },
      { label: 'Líneas activas',         value: 5,        icon: 'linear_scale',         color: 'primary' },
    ]);
  }
}
