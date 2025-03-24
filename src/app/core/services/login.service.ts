import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AppSettings } from '../setting/AppSetting';
import { Login } from '../interface/login';
import { ResponceAccess } from '../interface/ResponceAccess';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = AppSettings.ApiUrl;

  constructor(private http: HttpClient) {}

  // Método para registrar un usuario
//   register(objeto: User): Observable<ResponceAccess> {
//     return this.http.post<ResponceAccess>(`${this.baseUrl}users`, objeto);
//   }

  // Método para iniciar sesión
  login(credentials: Login): Observable<ResponceAccess> {
    return this.http
      .post<ResponceAccess>(`${this.baseUrl}auth/login`, credentials)
      .pipe(catchError(this.handleError)); 
  }

  // Guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}