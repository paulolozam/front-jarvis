// src/app/features/usuarios/usuarios.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { User, Role, UserRole, RegisterUser, ChangePassword } from '../../core/models/user.model';
import { Paginated } from '../../core/models/pagination.model';

const MOCK_USUARIOS: User[] = [
  {
    id: 1,
    username: 'jgarcia',
    email: 'jgarcia@empresa.com',
    first_name: 'Juan',
    last_name: 'García',
    is_active: true,
    roles: [{ id: 1, user: 1, role: 1, role_name: 'Admin', area: 1, area_name: 'Planta', created_at: '' }]
  },
  {
    id: 2,
    username: 'mlopez',
    email: 'mlopez@empresa.com',
    first_name: 'María',
    last_name: 'López',
    is_active: true,
    roles: [{ id: 2, user: 2, role: 2, role_name: 'Operador', area: 2, area_name: 'Linea de Ensamble', created_at: '' }]
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

const MOCK_PAGE: Paginated<User> = {
  count: MOCK_USUARIOS.length,
  next: null,
  previous: null,
  results: MOCK_USUARIOS
};

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private path = 'rbac/users';
  private useMock = false; // ← cambiar a false cuando el backend esté listo

  constructor(private api: ApiService) {}


  getAll(page: number = 1, pageSize: number = 15): Observable<Paginated<User>> {
    if (this.useMock) return of(MOCK_PAGE);
    return this.api.get<Paginated<User>>(
      `${this.path}/users-list/?page=${page}&page_size=${pageSize}`
    );
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
    return this.api.put<User>(`${this.path}/${id}/user-update/`, data);
  }

  getCatalogRoles(): Observable<Paginated<Role>> {
    if (this.useMock) {
      return of({
        count: 2,
        next: null,
        previous: null,
        results: [
          { id: 1, code: 'ADMIN', name: 'Admin', description: '', created_at: '' },
          { id: 2, code: 'OPERATOR', name: 'Operador', description: '', created_at: '' }
        ]
      });
    }
    return this.api.get<Paginated<Role>>('rbac/roles/');
  }

  getRoles(id: number): Observable<UserRole[]> {
    if (this.useMock) return of(MOCK_USUARIOS.find(u => u.id === id)?.roles ?? []);
    return this.api.get<UserRole[]>(`${this.path}/${id}/roles/`);
  }

  assignRole(id: number, roleId: number, areaId: number): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.post(`${this.path}/${id}/assign-role/`, { role: roleId, area: areaId });
  }

  removeRole(id: number, roleId: number): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.delete(`${this.path}/${id}/remove-role/`, { role: roleId });
  }

  changePassword(id: number, data: ChangePassword): Observable<any> {
    if (this.useMock) return of({ success: true });
    return this.api.post(`${this.path}/${id}/change-password/`, data);
  }
}
