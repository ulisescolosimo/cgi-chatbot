import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

interface Source {
  id: number;
  url: string;
  title?: string;
}

interface Message {
  text: string;
  isUser: boolean;
  feedback?: 'like' | 'dislike' | null;
  showFeedbackBox?: boolean;
  feedbackText?: string;
  sources?: Source[];
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  sidebarExpanded: boolean = false;
  healthProfileEnabled: boolean = true;
  isMobile: boolean = false;
  
  private _searchQuery: string = '';
  private resizeHandler: () => void;
  
  // Chat messages
  messages: Message[] = [];
  currentMessage: string = '';
  
  // Sources popover
  showSourcesPopover: { [key: number]: boolean } = {};
  
  // Sugerencias de preguntas
  quickSuggestions: string[] = [
    'What is a cancer mutation?',
    'How does genomic sequencing help?',
    'What are actionable mutations?'
  ];
  
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
  
  // Lista filtrada de preguntas (ahora es una propiedad, no un getter)
  filteredChatHistory: string[] = [...this.allChatHistory];

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    this._searchQuery = value;
    this.updateFilteredHistory();
  }

  constructor(private router: Router) {
    // Bind del resize handler para poder removerlo después
    this.resizeHandler = () => this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    // En desktop, la sidebar empieza abierta; en mobile, cerrada
    if (!this.isMobile) {
      this.sidebarExpanded = true;
    }
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    // Limpiar el event listener para evitar memory leaks
    window.removeEventListener('resize', this.resizeHandler);
  }

  private updateFilteredHistory(): void {
    if (!this._searchQuery.trim()) {
      this.filteredChatHistory = [...this.allChatHistory];
    } else {
      const query = this._searchQuery.toLowerCase();
      this.filteredChatHistory = this.allChatHistory.filter(question => 
        question.toLowerCase().includes(query)
      );
    }
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // md breakpoint
  }

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  onSuggestedQuestionClick(question: string): void {
    this.sendMessage(question);
  }

  sendMessage(messageText?: string): void {
    const text = messageText || this.currentMessage.trim();
    if (!text) return;

    // Agregar mensaje del usuario
    this.messages.push({
      text: text,
      isUser: true
    });

    // Limpiar input
    this.currentMessage = '';

    // Simular respuesta del bot
    setTimeout(() => {
      this.getBotResponse(text);
    }, 500);
  }

  getBotResponse(question: string): void {
    let response = '';
    let sources: Source[] = [];
    
    // Respuesta hardcodeada para "what is cancer?"
    if (question.toLowerCase().includes('what is cancer')) {
      response = 'Cancer is a disease in which some of the body\'s cells grow uncontrollably and spread to other parts of the body.¹';
      sources = [
        {
          id: 1,
          url: 'https://www.cancer.gov/about-cancer/understanding/what-is-cancer',
          title: 'National Cancer Institute - What is Cancer?'
        }
      ];
    } else {
      response = 'I\'m sorry, I don\'t have a specific answer for that question yet. This is a demo response.';
    }

    this.messages.push({
      text: response,
      isUser: false,
      feedback: null,
      showFeedbackBox: false,
      feedbackText: '',
      sources: sources
    });
  }

  setFeedback(message: Message, type: 'like' | 'dislike'): void {
    message.feedback = message.feedback === type ? null : type;
  }

  toggleFeedbackBox(message: Message): void {
    message.showFeedbackBox = !message.showFeedbackBox;
  }

  submitFeedback(message: Message): void {
    // Aquí puedes enviar el feedback a un servidor
    console.log('Feedback submitted:', message.feedbackText);
    message.showFeedbackBox = false;
    message.feedbackText = '';
  }

  onQuickSuggestionClick(suggestion: string): void {
    this.sendMessage(suggestion);
  }

  toggleSourcesPopover(messageIndex: number): void {
    this.showSourcesPopover[messageIndex] = !this.showSourcesPopover[messageIndex];
  }

  showSourcesPopoverFor(messageIndex: number): void {
    this.showSourcesPopover[messageIndex] = true;
  }

  hideSourcesPopoverFor(messageIndex: number): void {
    this.showSourcesPopover[messageIndex] = false;
  }

  isSourcesPopoverVisible(messageIndex: number): boolean {
    return !!this.showSourcesPopover[messageIndex];
  }

  clearHistory(): void {
    this.messages = [];
  }

  toggleHealthProfile(): void {
    this.healthProfileEnabled = !this.healthProfileEnabled;
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  // TrackBy functions para mejorar rendimiento del *ngFor
  trackByQuestion(index: number, question: string): string {
    return question;
  }

  trackByMessage(index: number, message: Message): number {
    return index;
  }

  trackBySource(index: number, source: Source): number {
    return source.id;
  }

  // Método para obtener el texto sin las referencias numéricas
  getTextWithoutReferences(text: string): string {
    return text.replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/g, '');
  }

  // Método para extraer las referencias del texto
  getReferencesFromText(text: string): string[] {
    const matches = text.match(/[¹²³⁴⁵⁶⁷⁸⁹⁰]+/g);
    return matches || [];
  }

}
