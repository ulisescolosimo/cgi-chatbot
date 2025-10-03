import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  sidebarExpanded: boolean = true;
  healthProfileEnabled: boolean = true;
  isMobile: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // md breakpoint
    // En desktop, la sidebar siempre debe estar expandida
    if (!this.isMobile) {
      this.sidebarExpanded = true;
    }
  }

  toggleSidebar(): void {
    // Solo permitir toggle en móvil
    if (this.isMobile) {
      console.log('toggleSidebar() called, current state:', this.sidebarExpanded);
      this.sidebarExpanded = !this.sidebarExpanded;
      console.log('Sidebar toggled to:', this.sidebarExpanded);
    }
  }

  onSuggestedQuestionClick(question: string): void {
    console.log('Pregunta sugerida clickeada:', question);
    // Aquí puedes agregar la lógica para manejar la pregunta
  }

  clearHistory(): void {
    console.log('Historial limpiado');
  }

  toggleHealthProfile(): void {
    this.healthProfileEnabled = !this.healthProfileEnabled;
    console.log('Perfil de salud:', this.healthProfileEnabled ? 'activado' : 'desactivado');
  }

}
