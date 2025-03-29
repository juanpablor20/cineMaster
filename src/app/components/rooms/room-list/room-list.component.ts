import { RouterLink } from '@angular/router';
import { RoomsService } from '../../../core/services/rooms.service';
import { Rooms } from './../../../core/interface/rooms.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-list',
  imports: [RouterLink],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export default class RoomListComponent {


  rooms:  Rooms[]= [];

  isLoading = true;

  constructor(private roomsService: RoomsService){}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe({
      next: (responce: any) => {
        this.rooms = Array.isArray(responce)
         ? responce
          : responce.data || responce.results || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

deleteRooms(id:string): void {
  if (confirm('estas seguro de eliminar')) {
    this.roomsService.deleteRoom(id).subscribe({
      next: () => {
        this.rooms = this.rooms.filter((room) => room.id!== id);
      },
      error: (error) => {
        console.error('Error deleting room:', error);
      },
    });
  }
}
  

}
