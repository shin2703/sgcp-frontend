import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgcpService } from '../../services/sgcp';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial implements OnInit {
  citas: any[] = [];
  cargando = true;

  constructor(private sgcpService: SgcpService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this.sgcpService.getCitas().subscribe({
      next: (data: any[]) => {
        this.citas = [...data];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}