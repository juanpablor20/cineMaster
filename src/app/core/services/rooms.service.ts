import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from '../interface/rooms.interface';
import { Observable } from 'rxjs';
import { AppSettings } from '../setting/AppSetting';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl: string = AppSettings.ApiUrl;

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(`${this.baseUrl}rooms`);

  }
  getRoomById(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}rooms/${id}`);
  }

  createRoom(roomData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(`${this.baseUrl}rooms`, roomData, {headers});
  }
  
  updateRoom(id: string, roomData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(`${this.baseUrl}rooms/${id}`, roomData, { headers });
  }
  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}rooms/${id}`);
  }

}
