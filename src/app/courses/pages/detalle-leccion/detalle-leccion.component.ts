import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from '../../../interfaces/response.model';
import { Leccion } from '../../../interfaces/leccion.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoursesService } from '../../CoursesServices/courses.service';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from "@angular/material/button";
import { MatCardContent, MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";

@Component({
  selector: 'app-detalle-leccion',
  standalone: true,
  imports: [MatIcon, MatButton, MatCardContent, MatCard, MatCardActions, MatCardHeader, MatCardTitle, MatCardSubtitle],
  templateUrl: './detalle-leccion.component.html',
  styleUrl: './detalle-leccion.component.css'
})
export class DetalleLeccionComponent implements OnInit {

  route = inject(ActivatedRoute);
  cursosService = inject(CoursesService);
  sanitizer = inject(DomSanitizer);
  router = inject(Router);

  idCurso!: string;
  idLeccion!: string;
  leccion!: Leccion;
  videoUrl!: SafeResourceUrl;

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.params['idCurso'];
    this.idLeccion = this.route.snapshot.params['idLeccion'];

    this.cursosService.listar(`/api/lessons/${this.idLeccion}`).subscribe(
      (response: response) => {
        if (response.status == 'SUCCESS') {
          this.leccion = response.data;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.leccion.youtubeUrl);
        }
      }
    );
  }

  goBack(){
    this.router.navigate([`/cursos/${this.idCurso}`]);
  }

}
