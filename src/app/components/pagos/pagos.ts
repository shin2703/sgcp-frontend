import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgcpService } from '../../services/sgcp';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos {
  pago = { deudaId: null, medioPago: '', tipoComprobante: '', monto: null };
  mensaje = '';
  error = '';

  constructor(private sgcpService: SgcpService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';

    const payload = {
      deudaId: this.pago.deudaId,
      medioPago: this.pago.medioPago,
      tipoComprobante: this.pago.tipoComprobante
    };

    this.sgcpService.registrarPago(payload).subscribe({
      next: (res: any) => {
        this.mensaje = `Pago registrado. Comprobante: ${res.numero} — Cita: ${res.citaEstado}`;
        this.pago = { deudaId: null, medioPago: '', tipoComprobante: '', monto: null };
      },
      error: (err: any) => {
        this.error = `Error ${err.status}: ${err.error?.message || 'Verifica los datos.'}`;
      }
    });
  }
}