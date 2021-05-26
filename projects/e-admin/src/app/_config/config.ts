import { environment } from "../../environments";

export const baseUrl = environment.apiUrl;
export const apiAdminBo = `${baseUrl}/bo/adminbo`;

export const apiUsers = `${baseUrl}/usuarios/users`;
// export const apiUsersGetAll = `${baseUrl}/usuarios/users/bo/getall`;
export const apiUsersUp = `${baseUrl}/usuarios/users/bo/register`;
export const apiUsersEdit = `${baseUrl}/usuarios/users/bo/update`;
export const apiUsersDelete = `${baseUrl}/usuarios/users/bo/delete`;

export const apiGetAllCbu = `${baseUrl}/usuarios/users/bo/getallvinculaciones`;
export const apiPostCbu = `${baseUrl}/usuarios/users/bo/vincularcbu`;

// Nuevos endpoints
export const apiAuth = `${apiAdminBo}/autenticarse`;
export const apiAuthInfo = `${apiAdminBo}/infousuario`;

export const apiApUsuarios = `${apiAdminBo}/usuarios`;
export const apiOrganizaciones = `${apiAdminBo}/organizaciones`;
