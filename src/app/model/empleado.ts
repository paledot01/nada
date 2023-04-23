import { Role } from './role';
import { Distrito } from './distrito';
import { Estado } from './estado';

export class Empleado {
    codEmpleado?: string
    distrito?: Distrito
    estado?: Estado
    nombre?: string
    apellidos?: string
    dni?: string
    direccion?: string
    telefono?: string
    email?: string
    usuario?: string
    contrasena?: string
    roles?: Role[]
}