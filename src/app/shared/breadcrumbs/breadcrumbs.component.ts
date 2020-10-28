import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, map, retry, take} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string;
  public Susbs: Subscription;
  constructor(private router: Router) { 

    this.Susbs = this.router.events
                            .pipe(filter(evento=>evento instanceof ActivationEnd),
                            filter((evento:ActivationEnd) => evento.snapshot.firstChild==null ),
                            map((evento:ActivationEnd) => evento.snapshot.data ))
    .subscribe(({title})=> {
      this.title = title;
      document.title = `AdminPro- ${title}`;
    });
  }
  ngOnDestroy(): void {
    this.Susbs.unsubscribe();
  }

}
