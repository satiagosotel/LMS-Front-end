import { Component, inject, OnInit } from '@angular/core';
import { response } from '../../../interfaces/response.model';
import { Curso } from '../../../interfaces/curso.model';

import { MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatActionList } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../../components/confirmar/confirmar.component';
import { CoursesService } from '../../CoursesServices/courses.service';

@Component({
  selector: 'app-listado-cursos',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatActionList, MatButton, MatCardActions, RouterOutlet, MatDialogModule],
  templateUrl: './listado-cursos.component.html',
  styleUrl: './listado-cursos.component.css',
})
export class ListadoCursosComponent implements OnInit {
  courseService = inject(CoursesService);
  router = inject(Router);
  dialog = inject(MatDialog);


  cursos!:Curso[];

  ngOnInit(): void {
    this.courseService.listar('/api/courses').subscribe((res:response) => {
      if(res.status.match("SUCCESS")){
        this.cursos = res.data;
      }
    });
  }


  irCurso(id: number): void {
    this.router.navigate(['/cursos', id]);
  }

  crearCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editarCurso(id: number): void {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminarCurso(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      data: {
        titulo: 'Eliminar Curso',
        mensaje: '¿Estás seguro de que deseas eliminar este curso?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseService.eliminar(`/api/courses/${id}`).subscribe(
          (response: response) => {
            if (response.status == 'SUCCESS') {
              this.cursos = this.cursos.filter(curso => curso.id !== id);
            }
          }
        );
      }
    });
  }
}
