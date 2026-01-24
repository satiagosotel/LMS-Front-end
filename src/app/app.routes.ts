import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { authGuard, guestGuard } from './auth/guard/auth.guard';
import { ListadoCursosComponent } from './courses/pages/listado-cursos/listado-cursos.component';
import { DetalleCursoComponent } from './courses/pages/detalle-curso/detalle-curso.component';
import { ListadoLeccionesComponent } from './courses/pages/listado-lecciones/listado-lecciones.component';
import { DetalleLeccionComponent } from './courses/pages/detalle-leccion/detalle-leccion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: MenuInicioComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        title: 'Inicio',
        children: [],
      },
      {
        path: 'cursos',
        title: 'Cursos',
        component: ListadoCursosComponent,
      },
      {
        path: 'cursos/:idCurso',
        title: 'Curso',
        component: DetalleCursoComponent,
      }
    ],
  },

  { path: '**', title: 'Page not found', component: PageNotFoundComponent },
];
