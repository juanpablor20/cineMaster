import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cinema } from '../../../core/interface/cinemas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent implements OnInit {

  cinemaForm: FormGroup;

  constructor(private fb: FormBuilder){

    this.cinemaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    })
  }
  
  ngOnInit(): void {

  }
  
  onSubmit(): void {
    if(this.cinemaForm.valid)
    {
      const cinemaData: Cinema = this.cinemaForm.value;
      console.log('Cinema creado:', cinemaData);
    }
  }

}
