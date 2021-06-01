
export interface Product {
  id?: string;
  name: string;
  apellido?: string;
  pictureId?: string;
  url?: string;
  location: string;
  hasDriverLicense: boolean;
  datos?: Datos;
  // pictureId?: string;
  // url?: string;
  // alumno?: string[];
  // horario?: string[];
}


export interface Datos {
  xname: string;
  xotro: string;
  totalClases?: number;
}
