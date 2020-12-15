import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Inicio', url: '/' },
        {title: 'ProgressBar', url: 'progress' },
        {title: 'Graficas', url: 'grafica1' },
        {title: 'Promise', url: 'promesa' },
        {title: 'RXJS', url: 'rxjs' },
      ]
      
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Usuarios', url: 'usuarios' },
        {title: 'Medicos', url: 'medicos' },
        {title: 'Hospitales', url: 'hospitales' },
      ]
    }
  ];

  constructor() { }
}
