import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function init();

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {

  

  constructor( private settingsservice: SettingsService) { }

  ngOnInit(): void {
    init();
  }

}
