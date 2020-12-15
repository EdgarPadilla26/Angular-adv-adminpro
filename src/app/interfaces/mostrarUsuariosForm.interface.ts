import { Usuario } from '../models/usuario.model';


export interface MostarUsuarios{
    total: number;
    usuarios:Usuario[];
}