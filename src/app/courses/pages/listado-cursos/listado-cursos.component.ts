import { Component, inject } from '@angular/core';
import { CoursesService } from '../../../services/CoursesServices/courses.service';
import { response } from '../../../interfaces/response.model';
import { Curso } from '../../../interfaces/curso.model';

import { MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatActionList } from "@angular/material/list";
import { MatButton } from "@angular/material/button";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listado-cursos',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardHeader, MatCardContent, MatActionList, MatButton, MatCardActions, RouterOutlet],
  templateUrl: './listado-cursos.component.html',
  styleUrl: './listado-cursos.component.css',
})
export class ListadoCursosComponent {
  courseService = inject(CoursesService);
  router = inject(Router);


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
}
