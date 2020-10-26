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
        {title: 'inicio', url: '/' },
        {title: 'ProgressBar', url: 'progress' },
        {title: 'Grafica1', url: 'grafica1' },
      ]
    }
  ];

  constructor() { }
}
