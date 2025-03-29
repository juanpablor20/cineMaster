import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../../../core/interface/movies.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export default class MovieFormComponent implements OnInit {

  movieForm: FormGroup;
  

  isEditMode = false;
  currendMovieId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      duration: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      videoUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if(id){
          this.isEditMode= true;
          this.currendMovieId = id;
          return this.moviesService.getMovieById(id);

        }
        return [null];
      })
    ).subscribe(movie => {
      if(movie) {
        this.movieForm.patchValue(movie);
      }

    });
  }

    onSubmit(): void {
      if(this.movieForm.valid){
      const movieData: Movie = this.movieForm.value;
    if(this.isEditMode && this.currendMovieId){
       this.moviesService.updateMovie(this.currendMovieId, movieData).subscribe({

        
        next: (response) => {
          console.log('Cine actualizado exitosamente:', response);
          this.router.navigate(['/dashboard/cinemas']);
        },
        error: (error) => {
          console.error('Error al actualizar el cine:', error);
          alert(`Error: ${error.message || 'No se pudo actualizar la pelicula'}`);
        }
      });

    }else{
      this.moviesService.createMovie(movieData).subscribe({
        next: (response) => {
          console.log('Cine creado exitosamente:', response);
          this.router.navigate(['/dashboard/cinemas']);
          this.movieForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el cine:', error);
          alert(`Error: ${error.message || 'No se pudo crear el cine'}`);
        }
      });
       
     }
  }else{
    this.markFormGroupTouched(this.movieForm);
 }
    }

private markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
}

}