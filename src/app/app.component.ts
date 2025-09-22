import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CGI-CLINICS';

  onLoginSubmit(event: Event) {
    event.preventDefault();
    // TODO: Implement login functionality
    console.log('Login form submitted');
    alert('Login functionality will be implemented here.');
  }

  showGrantInfo() {
    // TODO: Show grant information in a tooltip or modal
    alert('Grant Agreement CGI-Clinics 101057509\n\nThis project has received funding from the European Union\'s Horizon Europe programme.');
  }
}
