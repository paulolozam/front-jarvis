import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuariosService } from '../usuarios.service';
import { User, Role } from '../../../core/models/user.model';

export interface DialogData {
  user?: User;
  mode: 'crear' | 'editar';
}

@Component({
  selector: 'app-usuario-dialog',
  standalone: true,
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ]
})
export class UsuarioDialogComponent implements OnInit {
  form: FormGroup;
  loading = false;
  roles: Role[] = [];
  isEditar: boolean;

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditar = data.mode === 'editar';

    this.form = this.fb.group({
      first_name: [data.user?.first_name ?? '', Validators.required],
      last_name:  [data.user?.last_name  ?? '', Validators.required],
      username:   [data.user?.username   ?? '', Validators.required],
      email:      [data.user?.email      ?? '', [Validators.required, Validators.email]],
      is_active:  [data.user?.is_active  ?? true],
      roles:      [data.user?.roles?.map(r => r.id) ?? []]
    });

    // password solo requerido al crear
    if (!this.isEditar) {
      this.form.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
    }
  }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.service.getRoles(0).subscribe(roles => this.roles = roles);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const value = this.form.value;

    if (this.isEditar) {
      this.service.update(this.data.user!.id, value).subscribe({
        next: (updated) => this.dialogRef.close(updated),
        error: () => this.loading = false
      });
    } else {
      this.service.register(value).subscribe({
        next: (created) => this.dialogRef.close(created),
        error: () => this.loading = false
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }



}
