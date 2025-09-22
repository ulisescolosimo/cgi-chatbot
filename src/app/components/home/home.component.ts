import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to current user changes
    this.userSubscription = this.authService.currentUser$.subscribe(
      (user: User | null) => {
        this.currentUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    console.log('Usuario ha cerrado sesión');
  }

}
