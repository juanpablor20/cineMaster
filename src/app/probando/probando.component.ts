import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-probando',
  templateUrl: './probando.component.html',
  styleUrls: ['./probando.component.css'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({
        transform: 'rotate(0deg)'
      })),
      state('final', style({
        transform: 'rotate(360deg)'
      })),
      transition('initial <=> final', animate('500ms ease-in-out'))
    ])
  ]
})
export class ProbandoComponent implements OnInit {
  animationState = 'initial';

  ngOnInit() {
    // Cambiar el estado después de un tiempo
    setTimeout(() => {
      this.animationState = 'final';
    }, 1000);
  }

  // Método opcional para alternar el estado
  toggleRotation() {
    this.animationState = this.animationState === 'initial' ? 'final' : 'initial';
  }
}