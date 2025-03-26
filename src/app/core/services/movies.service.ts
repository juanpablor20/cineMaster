import { Injectable } from '@angular/core';
import { AppSettings } from '../setting/AppSetting';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interface/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = AppSettings.ApiUrl;


  constructor(private http: HttpClient) { }


  getMovie(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}movies`);
  }

  getMovieById(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}movies/${id}`);
  }

  createMovie(movieData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(`${this.baseUrl}movies`, movieData, {headers});
  }
   updateMovie(id: string, cinemaData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.patch(`${this.baseUrl}movies/${id}`, cinemaData, {headers});
   }

  deleteMovie(id: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}movies/${id}`);
  }



  
    
}
