// src/app/features/usuarios/usuarios.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuariosService } from './usuarios.service';
import { User } from '../../core/models/user.model';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class UsuariosComponent implements OnInit {
  usuarios = signal<User[]>([]);
  loading = signal(true);
  displayedColumns = ['nombre', 'email', 'roles', 'estado', 'acciones'];

  constructor(
    private service: UsuariosService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (data) => {
        this.usuarios.set(data.results);
        this.loading.set(false);
      },
      error: () => {
        this.snack.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }






  nuevoUsuario() {
  const ref = this.dialog.open(UsuarioDialogComponent, {
    data: { mode: 'crear' }
  });

  ref.afterClosed().subscribe(result => {
    if (result) {
      this.usuarios.update(list => [...list, result]);
    }
  });
}

editarUsuario(user: User) {
  const ref = this.dialog.open(UsuarioDialogComponent, {
    data: { mode: 'editar', user }
  });

  ref.afterClosed().subscribe(result => {
    if (result) {
      this.usuarios.update(list =>
        list.map(u => u.id === result.id ? result : u)
      );
    }
  });
}



}
