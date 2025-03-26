import { LoginService } from './../../core/services/login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../core/interface/login';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
   errorMessage: string | null   = null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService  
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Login = this.loginForm.value;
      this.errorMessage = null;
      this.loginService.login(credentials).subscribe({
        next: (response) => {
          this.loginService.saveToken(response.access_token);
          this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          console.error('Error en el login:', error);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        },
      });

    } 
  }
  
}