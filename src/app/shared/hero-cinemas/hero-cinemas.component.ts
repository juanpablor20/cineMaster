import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition, stagger, query, sequence } from '@angular/animations';

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
export class HeroCinemasComponent implements AfterViewInit {
  @ViewChild('cineSection') cineSection!: ElementRef;
  animationStates: string[] = ['hide', 'hide', 'hide'];
  private isAnimating = false;
  
  cines = [
    {
      title: 'El poder de la lámpara',
      autor: 'by John Smith',
      descripcion: 'Lorem ipsum carrots, enhanced undergraduate developer, but they do occaecat time and vitality...',
      imageUrl: 'https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
    },
    {
      title: 'El poder de la lámpara 2',
      autor: 'by John Smith',
      descripcion: 'Lorem ipsum carrots, enhanced undergraduate developer, but they do occaecat time and vitality...',
      imageUrl: 'https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
    },
    {
      title: 'El poder de la lámpara 3',
      autor: 'by John Smith',
      descripcion: 'Lorem ipsum carrots, enhanced undergraduate developer, but they do occaecat time and vitality...',
      imageUrl: 'https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80'
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimation();
    }
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimating) {
          this.showCards();
        } else if (!entry.isIntersecting) {
          this.hideCards();
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    if (this.cineSection?.nativeElement) {
      observer.observe(this.cineSection.nativeElement);
    }
  }

  showCards() {
    this.isAnimating = true;
    // Reset all to hide first
    this.animationStates = this.animationStates.map(() => 'hide');
    
    // Animate each card with delay
    this.animationStates.forEach((_, index) => {
      setTimeout(() => {
        this.animationStates[index] = 'show';
        if (index === this.animationStates.length - 1) {
          this.isAnimating = false;
        }
      }, index * 150); // 150ms delay between each card
    });
  }

  hideCards() {
    this.animationStates = this.animationStates.map(() => 'hide');
  }

  trackByFn(index: number): number {
    return index;
  }
}