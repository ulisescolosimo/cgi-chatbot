import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  selectedLanguage: string = 'EN';
  isDropdownOpen: boolean = false;
  
  languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'CA', name: 'Català' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'GK', name: 'Greek' }
  ];

  constructor() {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
    this.isDropdownOpen = false;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
