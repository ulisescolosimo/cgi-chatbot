import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  currentUser: User | null = null;
  private authSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      }
    );

    // Subscribe to current user changes
    this.userSubscription = this.authService.currentUser$.subscribe(
      (user: User | null) => {
        this.currentUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
