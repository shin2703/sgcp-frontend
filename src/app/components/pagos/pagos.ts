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
  pago = { deudaId: null, medioPago: '', tipo: '', monto: null };
  mensaje = '';
  error = '';

  constructor(private sgcpService: SgcpService) {}

  registrar() {
    this.mensaje = '';
    this.error = '';
    this.sgcpService.registrarPago(this.pago).subscribe({
      next: (res: any) => {
        this.mensaje = `Pago registrado correctamente. Comprobante: ${res.numero}`;
        this.pago = { deudaId: null, medioPago: '', tipo: '', monto: null };
      },
      error: () => { this.error = 'Error al registrar el pago. Verifica los datos.'; }
    });
  }
}