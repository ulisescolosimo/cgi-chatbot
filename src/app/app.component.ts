import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'eduCGI';
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  isHomePage(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '';
  }

  showGrantInfo() {
    // TODO: Show grant information in a tooltip or modal
    alert('Grant Agreement CGI-Clinics 101057509\n\nThis project has received funding from the European Union\'s Horizon Europe programme.');
  }
}
