import { RoleBo } from './role';

export class User {
  id: string;
  email: string;
  password?: string;
  jwtToken?: string;
  nombre?: string;
  name?: string;
  apellido?: string;
  role?: string;
  phone: string;
  cuit: string;
  razonSocial: string;
  psp: string;
  clienteId?: string;
  firstName?: string;
  lastName?: string;
  // created: string;
  // verificationToken: string;
  verified: string;
  bo: boolean;
  boRole?: RoleBo;
  profilePic?: string;
  // updated?: string;
  isVerified: boolean;
}
export class UserInfo {
  id: string;
  email: string;
  password?: string;
  jwtToken?: string;
  nombre?: string;
  name?: string;
  apellido?: string;
  role?: string;
  phone: string;
  cuit: string;
  razonSocial: string;
  psp: string;
  clienteId?: string;
  firstName?: string;
  lastName?: string;
  // created: string;
  // verificationToken: string;
  verified: string;
  bo: boolean;
  boRole?: RoleBo;
  profilePic?: string;
  // updated?: string;
  isVerified: boolean;
}
