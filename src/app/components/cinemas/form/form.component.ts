import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cinema } from '../../../core/interface/cinemas';
import { CommonModule } from '@angular/common';
import { CinemaService } from '../../../core/services/cinema.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export default class FormComponent implements OnInit {
  cinemaForm: FormGroup;
  isEditMode = false;
  currentCinemaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cinemaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentCinemaId = id;
          return this.cinemaService.getCinemaById(id);
        }
        return [null];
      })
    ).subscribe(cinema => {
      if (cinema) {
        this.cinemaForm.patchValue(cinema);
      }
    });
  }

  onSubmit(): void {
    if (this.cinemaForm.valid) {
      const cinemaData: Cinema = this.cinemaForm.value;
      
      if (this.isEditMode && this.currentCinemaId) {
        // Modo edición
        this.cinemaService.updateCinema(this.currentCinemaId, cinemaData).subscribe({
          next: (response) => {
            console.log('Cine actualizado exitosamente:', response);
            this.router.navigate(['/dashboard/cinemas']);
          },
          error: (error) => {
            console.error('Error al actualizar el cine:', error);
            alert(`Error: ${error.message || 'No se pudo actualizar el cine'}`);
          }
        });
      } else {
        // Modo creación
        this.cinemaService.createCinema(cinemaData).subscribe({
          next: (response) => {
            console.log('Cine creado exitosamente:', response);
            this.router.navigate(['/dashboard/cinemas']);
            this.cinemaForm.reset();
          },
          error: (error) => {
            console.error('Error al crear el cine:', error);
            alert(`Error: ${error.message || 'No se pudo crear el cine'}`);
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.cinemaForm);
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