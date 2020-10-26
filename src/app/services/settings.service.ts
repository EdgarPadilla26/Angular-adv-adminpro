import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() {
      const url = localStorage.getItem('theme') || `./assets/css/colors/red-dark.css`;
      this.linkTheme.setAttribute('href', url);
   }

   ChangeTheme(theme:string){
    
    const urlColor = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href', urlColor);

    localStorage.setItem('theme',urlColor);
    this.checkTheme();
  }

  checkTheme(){

    const link = document.querySelectorAll('.selector');
    link.forEach(elem=>{

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const UrlTheme = `./assets/css/colors/${btnTheme}.css`;
      const current = this.linkTheme.getAttribute('href');

      if(UrlTheme===current){
        elem.classList.add('working');
      }

    })

  }
}
