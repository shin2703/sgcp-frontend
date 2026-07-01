import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SgcpService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pacientes`);
  }

  registrarCita(cita: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas`, cita);
  }

  registrarPago(pago: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pagos`, pago);
  }

  getDeudas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/pagos/deudas/pendientes`);
}
  getCitas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/citas`);
}
}