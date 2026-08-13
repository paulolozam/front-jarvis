// src/app/core/models/user.model.ts
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff?: boolean;
  roles: UserRole[];
}

// Rol catalogo (rbac/roles/)
export interface Role {
  id: number;
  code: string;
  name: string;
  description: string;
  created_at: string;
}

// Asignacion de rol a un usuario, tal como viene embebida en User.roles[]
export interface UserRole {
  id: number;
  user: number;
  role: number;
  role_name: string;
  area: number;
  area_name: string;
  created_at: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
  new_password2: string;
}
