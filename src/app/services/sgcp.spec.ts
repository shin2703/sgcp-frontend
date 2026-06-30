import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SgcpService } from './sgcp';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('SgcpService', () => {
  let service: SgcpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SgcpService]
    });
    service = TestBed.inject(SgcpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getCitas debe hacer GET a /api/citas', () => {
    const mockCitas = [{ id: 1, codigo: 'CIT000001' }];
    service.getCitas().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].codigo).toBe('CIT000001');
    });
    const req = httpMock.expectOne('http://localhost:8080/api/citas');
    expect(req.request.method).toBe('GET');
    req.flush(mockCitas);
  });

  it('registrarCita debe hacer POST a /api/citas', () => {
    const payload = { pacienteId: 1, psicologoId: 32, especialidadId: 23, fechaHora: '2026-08-20T10:00:00' };
    const mockResponse = { codigo: 'CIT000002', deudaMonto: 150 };

    service.registrarCita(payload).subscribe(res => {
      expect((res as any).codigo).toBe('CIT000002');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/citas');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('registrarPago debe hacer POST a /api/pagos', () => {
    const payload = { deudaId: 22, medioPago: 'efectivo', tipoComprobante: 'boleta' };
    const mockResponse = { numero: 'COMP000001', citaEstado: 'pagada' };

    service.registrarPago(payload).subscribe(res => {
      expect((res as any).numero).toBe('COMP000001');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/pagos');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});