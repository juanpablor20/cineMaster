import { Injectable } from '@angular/core';
import { AppSettings } from '../setting/AppSetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl: string = AppSettings.ApiUrl;

  constructor(private http: HttpClient) { }


  getCinemas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cinemas`);
  }

  // GET con parámetros
  getCinemaById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cinemas/${id}`);
  }

  // GET con query params
  searchCinemas(query: string): Observable<any> {
    const params = new HttpParams().set('search', query);
    return this.http.get(`${this.baseUrl}/cinemas/search`, { params });
  }

  // Método POST
  createCinema(cinemaData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/cinemas`, cinemaData, { headers });
  }

  // Método PATCH (actualización parcial)
  updateCinema(id: string, partialUpdate: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.baseUrl}/cinemas/${id}`, partialUpdate, { headers });
  }

  // Método PUT (actualización completa)
  replaceCinema(id: string, cinemaData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/cinemas/${id}`, cinemaData, { headers });
  }

  // Método DELETE
  deleteCinema(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cinemas/${id}`);
  }

}
