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
  searchQuery: string = '';
  
  // Lista completa de preguntas del historial
  allChatHistory: string[] = [
    'What is cancer?',
    'What is a cancer mutation?',
    'What are actionable mutations in oncology?',
    'How does genomic sequencing help in cancer diagnosis?',
    'How can we know which mutations are actionable?',
    'What is precision medicine in cancer treatment?',
    'Explain tumor heterogeneity',
    'What are oncogenes and tumor suppressors?',
    'How do cancer cells evade the immune system?',
    'What is the role of DNA repair in cancer?',
    'Explain cancer metastasis mechanisms',
    'What are biomarkers in cancer diagnosis?',
    'How does chemotherapy work?',
    'What is immunotherapy in cancer treatment?'
  ];
  
  // Lista filtrada de preguntas
  get filteredChatHistory(): string[] {
    if (!this.searchQuery.trim()) {
      return this.allChatHistory;
    }
    return this.allChatHistory.filter(question => 
      question.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // md breakpoint
    // La sidebar puede ser toggleada tanto en mobile como en desktop
  }

  toggleSidebar(): void {
    console.log('toggleSidebar() called, current state:', this.sidebarExpanded);
    this.sidebarExpanded = !this.sidebarExpanded;
    console.log('Sidebar toggled to:', this.sidebarExpanded);
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

  clearSearch(): void {
    this.searchQuery = '';
    console.log('Search cleared');
  }

}
