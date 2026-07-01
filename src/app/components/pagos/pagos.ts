import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgcpService } from '../../services/sgcp';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos implements OnInit {
  pago = { deudaId: null, medioPago: '', tipoComprobante: '', monto: null };
  deudas: any[] = [];
  mensaje = '';
  error = '';
  cargandoDeudas = false;

  constructor(private sgcpService: SgcpService) {}

  ngOnInit() {
    this.cargarDeudas();
  }

  cargarDeudas() {
    this.cargandoDeudas = true;
    this.sgcpService.getDeudas().subscribe({
      next: (data: any[]) => {
        this.deudas = data.filter(d => d.estado === 'pendiente');
        this.cargandoDeudas = false;
      },
      error: () => {
        this.cargandoDeudas = false;
      }
    });
  }

  seleccionarDeuda(deuda: any) {
    this.pago.deudaId = deuda.id;
    this.pago.monto = deuda.monto;
  }

  registrar() {
    this.mensaje = '';
    this.error = '';

    if (!this.pago.deudaId) {
      this.error = 'Debe seleccionar una deuda.';
      return;
    }
    if (!this.pago.medioPago) {
      this.error = 'Debe seleccionar un medio de pago.';
      return;
    }
    if (!this.pago.tipoComprobante) {
      this.error = 'Debe seleccionar un tipo de comprobante.';
      return;
    }

    const payload = {
      deudaId: this.pago.deudaId,
      medioPago: this.pago.medioPago,
      tipoComprobante: this.pago.tipoComprobante
    };

    this.sgcpService.registrarPago(payload).subscribe({
      next: (res: any) => {
        this.mensaje = `Pago registrado. Comprobante: ${res.numero} — Cita: ${res.citaEstado}`;
        this.pago = { deudaId: null, medioPago: '', tipoComprobante: '', monto: null };
        this.cargarDeudas();
      },
      error: (err: any) => {
        this.error = `Error ${err.status}: ${err.error?.message || 'Verifica los datos.'}`;
      }
    });
  }
}