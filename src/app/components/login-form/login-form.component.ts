import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Output() loginSubmit = new EventEmitter<Event>();

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService) {}

  onLoginSubmit(event: Event) {
    event.preventDefault();
    
    // Clear previous errors
    this.clearAllErrors();
    
    // Validate fields
    if (!this.validateEmail() || !this.validatePassword()) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente';
      return;
    }

    this.isLoading = true;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const isAuthenticated = this.authService.login(this.email, this.password);
      
      if (isAuthenticated) {
        this.errorMessage = '';
        this.loginSubmit.emit(event);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Usa: test@gmail.com / 20432043';
      }
      
      this.isLoading = false;
    }, 1000);
  }

  validateEmail(): boolean {
    if (!this.email) {
      this.emailError = 'El email es requerido';
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Por favor, introduce un email válido';
      return false;
    }
    
    this.emailError = '';
    return true;
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'La contraseña es requerida';
      return false;
    }
    
    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }
    
    this.passwordError = '';
    return true;
  }

  clearError() {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';
  }

  clearAllErrors() {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
