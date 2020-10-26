import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  public linkTheme: Element = document.querySelector('#theme');
  public link: NodeListOf<Element>;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    
    this.settingsService.checkTheme();
  }

  ChangeTheme(theme:string){
    this.settingsService.ChangeTheme(theme);
  }

}
