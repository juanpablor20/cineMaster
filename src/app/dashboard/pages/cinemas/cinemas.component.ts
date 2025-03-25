import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListCinemaComponent } from '../../../components/cinemas/list-cinema/list-cinema.component';

@Component({
  selector: 'app-cinemas',
  imports: [ListCinemaComponent],
  templateUrl: './cinemas.component.html',
  styleUrl: './cinemas.component.css'
})
export  default class CinemasComponent {

}
