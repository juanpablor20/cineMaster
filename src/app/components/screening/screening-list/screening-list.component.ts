import { Component, OnInit } from '@angular/core';
import { Screening } from '../../../core/interface/screening.interface';
import { ScreeningService } from '../../../core/services/screening.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-screening-list',
  imports: [RouterLink],
  templateUrl: './screening-list.component.html',
  styleUrl: './screening-list.component.css'
})
export  class ScreeningListComponent implements OnInit {

  screenings: Screening[] = [];
  isLoading: boolean = true;
  constructor(
    private screening: ScreeningService
  ) { }
  ngOnInit(): void {
    this.loadScreenings();
  }
  loadScreenings(): void {
    this.screening.getScreening().subscribe({
      next: (response: any) => {
        this.screenings = response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error retrieving screenings:', error);
        this.isLoading = false;
      }
    });
  }

  deleteScreening(id: string): void {
    if (confirm('Are you sure you want to delete this screening?')) {
      this.screening.deleteScreening(id).subscribe({
        next: () => {
          this.screenings = this.screenings.filter((screening) => screening.id!== id);
        },
        error: (error: any) => {
          console.error('Error deleting screening:', error);
        }
      });
    }
  }


}
