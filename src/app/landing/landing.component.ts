import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroMovieComponent } from '../shared/hero-movie/hero-movie.component';
import { HeroCinemasComponent } from '../shared/hero-cinemas/hero-cinemas.component';
import { ProbandoComponent } from '../probando/probando.component';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, HeroMovieComponent, HeroCinemasComponent, ProbandoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {


  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;


  videoUrls = {
    accion: '/assets/video/video1.mp4',
    drama: '/assets/video/video2.mp4',
    terror: '/assets/video/video3.mp4',
    infantil: '/assets/video/video4.mp4'
  };

  // Títulos para cada categoría
  videoTitles = {
    accion: '¡Explosiones y Emoción!',
    drama: '¿estas intrigado?',
    terror: '¿Te atreves a ver esto?',
    infantil: 'Historias que conmueven'
  };

  currentVideoUrl: string = this.videoUrls.terror; // Video por defecto
  currentVideoTitle: string = this.videoTitles.terror;

  // Cambia el video al hacer clic en el navbar
  changeVideo(category: keyof typeof this.videoUrls) {
    this.currentVideoUrl = this.videoUrls[category];
    this.currentVideoTitle = this.videoTitles[category];
    
    // Fuerza la recarga del video (opcional, para algunos navegadores)
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
    }
  }
}
