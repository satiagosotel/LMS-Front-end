import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/CoursesServices/courses.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { response } from '../../../interfaces/response.model';
import { Leccion } from '../../../interfaces/leccion.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.css'
})
export class DetalleCursoComponent implements OnInit{

  cursosService = inject(CoursesService);
  route = inject(ActivatedRoute);

  idCurso!: string;
  lecciones!: Leccion[];

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.params['idCurso'];

    this.cursosService.listar(`/api/courses/${this.idCurso}`).subscribe(
      (response:response)=>{
        if(response.status == 'SUCCESS'){
          this.lecciones = response.data.lessons;
        }
      }
    )

  }

}
