import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ScreeningService } from '../../../core/services/screening.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Movie } from '../../../core/interface/movies.interface';
import { MoviesService } from '../../../core/services/movies.service';
import { Rooms } from '../../../core/interface/rooms.interface';
import { RoomsService } from '../../../core/services/rooms.service';
import { Screening } from '../../../core/interface/screening.interface';

@Component({
  selector: 'app-screening-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
   
  ],
  templateUrl: './screening-form.component.html',
})
export default class ScreeningFormComponent implements OnInit {
  screeningForm: FormGroup;
  rooms: Rooms[] = [];
  movies: Movie[] = [];
  isEditMode = false;
  currentScreeningId: string | null = null;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private screeningService: ScreeningService,
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private roomsService: RoomsService
  ) {
    this.screeningForm = this.fb.group({
      screeningDate: ['', Validators.required],
      screeningTime: ['', Validators.required],
      movieId: ['', Validators.required],
      roomId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    
    this.moviesService.getMovie().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loadRooms();
      },
      error: () => this.isLoading = false
    });
  }

  private loadRooms(): void {
    this.roomsService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loadScreeningData();
      },
      error: () => this.isLoading = false
    });
  }

  private loadScreeningData(): void {
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
    ).subscribe({
      next: (screening) => {
        if (screening) {
          this.patchFormValues(screening);
        }
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  private patchFormValues(screening: Screening): void {
    const screeningDate = new Date(screening.screeningTime);
    const timeString = this.formatTime(screeningDate);
    
    this.screeningForm.patchValue({
      ...screening,
      screeningDate: screeningDate,
      screeningTime: timeString
    });
  }

  onSubmit(): void {
    if (this.screeningForm.invalid) {
      this.markFormGroupTouched(this.screeningForm);
      return;
    }

    this.isSubmitting = true;
    const formValue = this.screeningForm.value;
    const screeningDateTime = this.combineDateAndTime(
      formValue.screeningDate, 
      formValue.screeningTime
    );

    const screeningData: Screening = {
      ...formValue,
      screeningTime: screeningDateTime.toISOString()
    };

    const operation = this.isEditMode && this.currentScreeningId
      ? this.screeningService.updateScreening(this.currentScreeningId, screeningData)
      : this.screeningService.createScreening(screeningData);

    operation.subscribe({
      next: () => this.router.navigate(['/dashboard/screening']),
      error: (error) => {
        console.error('Error:', error);
        this.isSubmitting = false;
      }
    });
  }

  private combineDateAndTime(date: Date, time: string): Date {
    const newDate = new Date(date);
    const [hours, minutes] = time.split(':');
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    return newDate;
  }

  private formatTime(date: Date): string {
    return `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}