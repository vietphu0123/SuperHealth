import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageReloadService {
  constructor(private router: Router) {
    this.listenForPageReload();
  }

  private listenForPageReload() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        window.onpopstate = () => {
          window.location.reload();
        };
      }
    });
  }
}