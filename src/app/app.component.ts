import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CGI-CLINICS';
  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription
    this.authSubscription.unsubscribe();
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();
    // The login logic is now handled in the LoginFormComponent
    console.log('Login successful - user authenticated');
  }

  showGrantInfo() {
    // TODO: Show grant information in a tooltip or modal
    alert('Grant Agreement CGI-Clinics 101057509\n\nThis project has received funding from the European Union\'s Horizon Europe programme.');
  }
}
