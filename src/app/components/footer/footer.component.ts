import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Output() grantInfoClick = new EventEmitter<void>();

  showGrantInfo() {
    this.grantInfoClick.emit();
    // TODO: Show grant information in a tooltip or modal
    alert('Grant Agreement CGI-Clinics 101057509\n\nThis project has received funding from the European Union\'s Horizon Europe programme.');
  }
}
