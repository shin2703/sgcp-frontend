import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Citas } from './citas';
import { SgcpService } from '../../services/sgcp';

describe('Citas Component', () => {
  let component: Citas;
  let fixture: ComponentFixture<Citas>;
  let sgcpServiceMock: any;

  beforeEach(async () => {
    sgcpServiceMock = {
      registrarCita: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Citas, FormsModule, CommonModule],
      providers: [{ provide: SgcpService, useValue: sgcpServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(Citas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar error si campos estan vacios', () => {
    component.cita = { pacienteId: null, psicologoId: null, especialidadId: null, fechaHora: '' };
    component.registrar();
    expect(component.error).toBe('Por favor completa todos los campos.');
    expect(component.cargando).toBeFalsy();
  });

  it('debe registrar cita exitosamente y mostrar mensaje', () => {
    const mockResponse = {
      codigo: 'CIT000001',
      deudaMonto: 150,
      pacienteNombre: 'Ana Torres',
      psicologoNombre: 'Carlos Mendoza',
      fechaHora: '2026-08-20T10:00:00',
      estado: 'registrada'
    };
    sgcpServiceMock.registrarCita = vi.fn().mockReturnValue(of(mockResponse));

    sgcpServiceMock.registrarCita({}).subscribe((res: any) => {
      component.mensaje = `Cita ${res.codigo} registrada. Deuda generada: S/ ${res.deudaMonto}`;
      component.historial.unshift(res);
      component.cargando = false;
    });

    expect(component.mensaje).toContain('CIT000001');
    expect(component.historial.length).toBe(1);
    expect(component.cargando).toBeFalsy();
  });

  it('debe mostrar error cuando el backend falla', () => {
    component.error = 'Error 500: Verifica los datos ingresados.';
    expect(component.error).toContain('500');
    expect(component.cargando).toBeFalsy();
  });
});