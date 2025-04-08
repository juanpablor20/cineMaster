import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Cinema } from '../../core/interface/cinemas';
import { CinemaService } from '../../core/services/cinema.service';

@Component({
  selector: 'app-hero-cinemas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-cinemas.component.html',
  styleUrls: ['./hero-cinemas.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateX(100px)'
      })),
      transition('hide => show', [
        animate('600ms ease-out')
      ]),
      transition('show => hide', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class HeroCinemasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cineSection') cineSection!: ElementRef<HTMLElement>;
  animationStates: string[] = [];
  private isAnimating = false;
  cinemas: Cinema[] = [];
  isLoading = true;
  private observer: IntersectionObserver | null = null;
  private visibilityTimeout: any = null;

  constructor(
    private cinemaService: CinemaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCinemas();
  }

  loadCinemas(): void {
    this.cinemaService.getCinemas().subscribe({
      next: (response: any) => {
        this.cinemas = Array.isArray(response) ? response : response.data || response.results || [];
        this.animationStates = new Array(this.cinemas.length).fill('hide');
        this.isLoading = false;
        
        // Verificar visibilidad después de que la vista se haya actualizado
        if (isPlatformBrowser(this.platformId)) {
          this.visibilityTimeout = setTimeout(() => this.checkVisibility(), 300);
        }
      },
      error: (error) => {
        console.error('Error loading cinemas:', error);
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimation();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.visibilityTimeout) {
      clearTimeout(this.visibilityTimeout);
    }
  }

  private setupScrollAnimation() {
    if (!this.cineSection?.nativeElement) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimating) {
          this.showCards();
        } else if (!entry.isIntersecting) {
          this.hideCards();
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    this.observer.observe(this.cineSection.nativeElement);
  }

  private checkVisibility() {
    if (!this.cineSection?.nativeElement || !isPlatformBrowser(this.platformId)) return;
    
    const element = this.cineSection.nativeElement;
    if (typeof element.getBoundingClientRect !== 'function') return;
    
    const rect = element.getBoundingClientRect();
    const isVisible = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
    
    if (isVisible && !this.isAnimating && this.animationStates.length > 0) {
      this.showCards();
    }
  }

  showCards() {
    if (this.isAnimating || this.animationStates.length === 0) return;
    
    this.isAnimating = true;
    this.animationStates = this.animationStates.map(() => 'hide');
    
    this.animationStates.forEach((_, index) => {
      setTimeout(() => {
        if (index < this.animationStates.length) {
          this.animationStates[index] = 'show';
        }
        if (index === this.animationStates.length - 1) {
          this.isAnimating = false;
        }
      }, index * 150);
    });
  }

  hideCards() {
    this.animationStates = this.animationStates.map(() => 'hide');
  }

  trackByFn(index: number): number {
    return index;
  }
}