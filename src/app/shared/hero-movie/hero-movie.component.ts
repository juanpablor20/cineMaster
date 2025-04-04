import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-movie',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero-movie.component.html',
  styleUrl: './hero-movie.component.css'
})
export class HeroMovieComponent {

 
  public ImgMovies: string[] = [
    // Acción
    'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',  // John Wick 4
    'https://image.tmdb.org/t/p/w500/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',  // Mission: Impossible
    'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',  // John Wick 4
    'https://image.tmdb.org/t/p/w500/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',  // Mission: Impossible
    
    // Drama
    'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',  // Oppenheimer
    'https://image.tmdb.org/t/p/w500/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg'   // Poor Things
  ];
  

}
