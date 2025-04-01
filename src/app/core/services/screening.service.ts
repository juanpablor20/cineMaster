import { Injectable } from '@angular/core';
import { AppSettings } from '../setting/AppSetting';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Screening } from '../interface/screening.interface';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  private baseUrl: string = AppSettings.ApiUrl

  constructor(private http: HttpClient) { }


  getScreening(): Observable<Screening[]>{
    return this.http.get<Screening[]>(`${this.baseUrl}screenings`);
  }
  getScreeningById(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}screenings/${id}`);
  }  
  
   createScreening(screeningData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(`${this.baseUrl}screenings`, screeningData, {headers});
  }
  updateScreening(id: string, cinemaData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.patch(`${this.baseUrl}screenings/${id}`, cinemaData, {headers});
  }
  deleteScreening(id: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}screenings/${id}`);
  }
}
