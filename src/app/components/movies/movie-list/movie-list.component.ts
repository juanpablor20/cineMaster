import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../core/interface/movies.interface';
import { MoviesService } from '../../../core/services/movies.service';
import { response } from 'express';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getMovie().subscribe({
      next: (response: any) => {
        this.movies = Array.isArray(response)
          ? response
          : response.data || response.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }
  deleteMovies(id: string): void {
    if (confirm('estas seguro de eliminar')) {
      this.moviesService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter((movie) => movie.id !== id);
        },
        error: (error) => {
          console.error('Error deleting movie:', error);
        },
      });
    }
  }
}
