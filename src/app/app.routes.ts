import { Routes } from '@angular/router';
import { Citas } from './components/citas/citas';
import { Pagos } from './components/pagos/pagos';

export const routes: Routes = [
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: 'citas', component: Citas },
  { path: 'pagos', component: Pagos }
];