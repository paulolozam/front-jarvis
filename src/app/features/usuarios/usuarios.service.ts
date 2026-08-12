// src/app/features/usuarios/usuarios.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { User, Role, RegisterUser, ChangePassword } from '../../core/models/user.model';

const MOCK_USUARIOS: User[] = [
  {
    id: 1,
    username: 'jgarcia',
    email: 'jgarcia@empresa.com',
    first_name: 'Juan',
    last_name: 'García',
    is_active: true,
    roles: [{ id: 1, name: 'Admin' }]
  },
  {
    id: 2,
    username: 'mlopez',
    email: 'mlopez@empresa.com',
    first_name: 'María',
    last_name: 'López',
    is_active: true,
    roles: [{ id: 2, name: 'Operador' }]
  },
  {
    id: 3,
    username: 'rperez',
    email: 'rperez@empresa.com',
    first_name: 'Roberto',
    last_name: 'Pérez',
    is_active: false,
    roles: []
  }
];

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private path = 'rbac/users';
  private useMock = false; // ← cambiar a false cuando el backend esté listo

  constructor(private api: ApiService) {}

  getAll(): Observable<User[]> {
    if (this.useMock) return of(MOCK_USUARIOS);
    return this.api.get<User[]>(`${this.path}/users_list/`);
  }

  getMe(): Observable<User> {
    if (this.useMock) return of(MOCK_USUARIOS[0]);
    return this.api.get<User>(`${this.path}/me/`);
  }

  register(data: RegisterUser): Observable<User> {
    if (this.useMock) return of({ id: 99, ...data, is_active: true, roles: [] });
    return this.api.post<User>(`${this.path}/register/`, data);
  }

  update(id: number, data: Partial<User>): Observable<User> {
    if (this.useMock) {
      const user = MOCK_USUARIOS.find(u => u.id === id)!;
      return of({ ...user, ...data });
    }
    return this.api.put<User>(`${this.path}/${id}/user_update/`, data);
  }

  getRoles(id: number): Observable<Role[]> {
    if (this.useMock) return of([{ id: 1, name: 'Admin' }, { id: 2, name: 'Operador' }]);
    return this.api.get<Role[]>(`${this.path}/${id}/roles/`);
  }

  assignRole(id: number, roleId: number): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.post(`${this.path}/${id}/assign_role/`, { role_id: roleId });
  }

  removeRole(id: number, roleId: number): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.post(`${this.path}/${id}/remove_role/`, { role_id: roleId });
  }

  changePassword(id: number, data: ChangePassword): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.post(`${this.path}/${id}/change_password/`, data);
  }
}
