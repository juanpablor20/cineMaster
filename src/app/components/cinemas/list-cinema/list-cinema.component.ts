import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cinema } from '../../../core/interface/cinemas';
import { CinemaService } from '../../../core/services/cinema.service';

@Component({
  selector: 'app-list-cinema',
  imports: [RouterLink],
  templateUrl: './list-cinema.component.html',
  styleUrl: './list-cinema.component.css'
})
export class ListCinemaComponent implements OnInit {
  cinemas: Cinema[] = [];
  isLoading: boolean = true;

  constructor(private cinemaService: CinemaService) {}

  ngOnInit(): void {
    this.loadCinemas();
  }

  loadCinemas(): void {
    this.cinemaService.getCinemas().subscribe({
      next: (response: any) => {
        // Verifica si la respuesta es un array o está dentro de una propiedad data
        this.cinemas = Array.isArray(response) ? response : response.data || response.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cinemas:', error);
        this.isLoading = false;
      }
    });
  }

  deleteCinema(id: string): void {
    if(confirm('¿Estás seguro de eliminar este cine?')) {
      this.cinemaService.deleteCinema(id).subscribe({
        next: () => {
          this.cinemas = this.cinemas.filter(cinema => cinema.id !== id);
        },
        error: (error) => {
          console.error('Error deleting cinema:', error);
        }
      });
    }
  }

}
