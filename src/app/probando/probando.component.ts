import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-probando',
  templateUrl: './probando.component.html',
  styleUrls: ['./probando.component.css'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({ transform: 'rotate(0deg)' })),
      state('hovered', style({ transform: 'rotate(360deg)' })),
      transition('initial <=> hovered', animate('800ms ease-in-out'))
    ])
  ]
})
export class ProbandoComponent {
  animationState = 'initial';

  onMouseEnter() {
    this.animationState = 'hovered';
  }

  onMouseLeave() {
    this.animationState = 'initial';
  }
}
