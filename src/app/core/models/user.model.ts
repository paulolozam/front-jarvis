// src/app/core/models/user.model.ts
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
}
