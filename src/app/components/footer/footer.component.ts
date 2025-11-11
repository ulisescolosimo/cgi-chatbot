import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Output() grantInfoClick = new EventEmitter<void>();
  showModal = false;

  showGrantInfo() {
    this.grantInfoClick.emit();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
