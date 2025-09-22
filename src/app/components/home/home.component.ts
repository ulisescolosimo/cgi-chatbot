import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
    // For now, we'll reload the page to go back to login
    window.location.reload();
  }

}
