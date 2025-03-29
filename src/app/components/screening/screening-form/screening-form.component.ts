import { CommonModule } from '@angular/common';
import { Screening } from './../../../core/interface/screening.interface';
import { ScreeningService } from './../../../core/services/screening.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-screening-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './screening-form.component.html',
  styleUrl: './screening-form.component.css'
})
export default class ScreeningFormComponent {

  screeningForm: FormGroup;

  isEditMode = false;
  currentScreeningId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private screeningService: ScreeningService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.screeningForm = this.fb.group({
      screeningTime: ['', Validators.required],
      movieId: ['', Validators.required],
      roomId: ['', Validators.required]
    });
  }



  

   ngOnInit(): void {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.currentScreeningId = id;
            return this.screeningService.getScreeningById(id);
          }
          return [null];
        })
      ).subscribe(screening => {
        if (screening) {
          this.screeningForm.patchValue(screening);
        }
      });
    }
  
    onSubmit(): void {
      if (this.screeningForm.valid) {
        const screeningData: Screening = this.screeningForm.value;
        
        if (this.isEditMode && this.currentScreeningId) {
          // Modo edición
          this.screeningService.updateScreening(this.currentScreeningId, screeningData).subscribe({
            next: (response) => {
              console.log('Cine actualizado exitosamente:', response);
              this.router.navigate(['/dashboard/screening']);
            },
            error: (error) => {
              console.error('Error al actualizar la proyecccion:', error);
              alert(`Error: ${error.message || 'No se pudo actualizar el cine'}`);
            }
          });
        } else {
          // Modo creación
          this.screeningService.createScreening(screeningData).subscribe({
            next: (response) => {
              console.log('Cine creado exitosamente:', response);
              this.router.navigate(['/dashboard/screening']);
              this.screeningForm.reset();
            },
            error: (error) => {
              console.error('Error al crear el cine:', error);
              alert(`Error: ${error.message || 'No se pudo crear el cine'}`);
            }
          });
        }
      } else {
        this.markFormGroupTouched(this.screeningForm);
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
