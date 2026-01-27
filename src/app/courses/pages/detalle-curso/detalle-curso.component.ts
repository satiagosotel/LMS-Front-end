import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { response } from '../../../interfaces/response.model';
import { Leccion } from '../../../interfaces/leccion.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../../components/confirmar/confirmar.component';
import { CoursesService } from '../../CoursesServices/courses.service';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MatDialogModule],
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.css'
})
export class DetalleCursoComponent implements OnInit {

  cursosService = inject(CoursesService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);

  idCurso!: string;
  lecciones!: Leccion[];

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.params['idCurso'];
    this.cargarLecciones();
  }

  cargarLecciones(): void {
    this.cursosService.listar(`/api/courses/${this.idCurso}`).subscribe(
      (response: response) => {
        if (response.status == 'SUCCESS') {
          this.lecciones = response.data.lessons;
        }
      }
    );
  }

  verLeccion(id: number): void {
    this.router.navigate(['/cursos', this.idCurso, 'leccion', id]);
  }

  crearLeccion(): void {
    this.router.navigate(['/cursos', this.idCurso, 'leccion', 'nueva']);
  }

  editarLeccion(id: number): void {
    this.router.navigate(['/cursos', this.idCurso, 'leccion', 'editar', id]);
  }

  eliminarLeccion(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      data: {
        titulo: 'Eliminar Lección',
        mensaje: '¿Estás seguro de que deseas eliminar esta lección?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cursosService.eliminar(`/api/lessons/${id}`).subscribe(
          (response: response) => {
            if (response.status == 'SUCCESS') {
              this.lecciones = this.lecciones.filter(leccion => leccion.id !== id);
            }
          }
        );
      }
    });
  }
}
