import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomsService } from '../../../core/services/rooms.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Rooms } from '../../../core/interface/rooms.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-form',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export default class RoomFormComponent {

  roomForm: FormGroup;
  isEditMode: boolean = false;
  currentRoomId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomsService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      cinemaId: ['', Validators.required]
    });
  }

  
   ngOnInit(): void {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          if(id){
            this.isEditMode= true;
            this.currentRoomId = id;
            return this.roomService.getRoomById(id);
  
          }
          return [null];
        })
      ).subscribe(room => {
        if(room) {
          this.roomForm.patchValue(room);
        }
  
      });
    }

     onSubmit(): void {
          if(this.roomForm.valid){
          const roomData: Rooms = this.roomForm.value;
        if(this.isEditMode && this.currentRoomId){
           this.roomService.updateRoom(this.currentRoomId, roomData).subscribe({
    
            
            next: (response) => {
              console.log('Cine actualizado exitosamente:', response);
              this.router.navigate(['/dashboard/room']);
            },
            error: (error) => {
              console.error('Error al actualizar el cine:', error);
              alert(`Error: ${error.message || 'No se pudo actualizar la pelicula'}`);
            }
          });
    
        }else{
          this.roomService.createRoom(roomData).subscribe({
            next: (response) => {
              console.log('Cine creado exitosamente:', response);
              this.router.navigate(['/dashboard/room']);
              this.roomForm.reset();
            },
            error: (error) => {
              console.error('Error al crear el cine:', error);
              alert(`Error: ${error.message || 'No se pudo crear el cine'}`);
            }
          });
           
         }
      }else{
        this.markFormGroupTouched(this.roomForm);
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
