import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgcpService } from '../../services/sgcp';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas {
  cita = { pacienteId: null, psicologoId: null, especialidadId: null, fechaHora: '' };
  mensaje = '';
  error = '';

  constructor(private sgcpService: SgcpService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    const payload = {
      pacienteId: this.cita.pacienteId,
      psicologoId: this.cita.psicologoId,
      especialidadId: this.cita.especialidadId,
      fechaHora: this.cita.fechaHora
    };
    this.sgcpService.registrarCita(payload).subscribe({
      next: (res: any) => {
        this.mensaje = `Cita registrada: ${res.codigo} — Deuda generada: S/ ${res.deudaMonto}`;
        this.cita = { pacienteId: null, psicologoId: null, especialidadId: null, fechaHora: '' };
      },
      error: () => { this.error = 'Error al registrar la cita. Verifica los datos.'; }
    });
  }
}