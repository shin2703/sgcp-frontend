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
  cargando = false;
  enviado = false;
  historial: any[] = [];

  constructor(private sgcpService: SgcpService) {}

  onFechaChange(event: any) {
    this.cita.fechaHora = event.target.value;
  }

  registrar() {
    this.enviado = true;
    this.mensaje = '';
    this.error = '';

    const fechaInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    if (fechaInput) {
      this.cita.fechaHora = fechaInput.value;
    }

    if (!this.cita.pacienteId || !this.cita.psicologoId || !this.cita.especialidadId || !this.cita.fechaHora) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    this.cargando = true;
    const fechaFormateada = this.cita.fechaHora.length === 16
      ? this.cita.fechaHora + ':00'
      : this.cita.fechaHora;

    const payload = {
      pacienteId: this.cita.pacienteId,
      psicologoId: this.cita.psicologoId,
      especialidadId: this.cita.especialidadId,
      fechaHora: fechaFormateada
    };

    this.sgcpService.registrarCita(payload).subscribe({
      next: (res: any) => {
        this.mensaje = `Cita ${res.codigo} registrada. Deuda generada: S/ ${res.deudaMonto}`;
        this.historial.unshift(res);
        this.cita = { pacienteId: null, psicologoId: null, especialidadId: null, fechaHora: '' };
        this.enviado = false;
        this.cargando = false;
      },
      error: (err: any) => {
        if (err.error?.message?.includes('R0013') || err.error?.message?.includes('psicólogo ya tiene')) {
          this.error = 'El psicólogo ya tiene una cita en ese horario. Elige otra fecha u hora.';
        } else if (err.status === 0) {
          this.error = 'No se puede conectar al servidor.';
        } else {
          this.error = `Error ${err.status}: ${err.error?.message || 'Verifica los datos ingresados.'}`;
        }
        this.cargando = false;
      }
    });
  }
}