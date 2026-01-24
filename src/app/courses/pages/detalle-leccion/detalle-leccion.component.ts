import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/CoursesServices/courses.service';
import { response } from '../../../interfaces/response.model';
import { Leccion } from '../../../interfaces/leccion.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-leccion',
  standalone: true,
  imports: [],
  templateUrl: './detalle-leccion.component.html',
  styleUrl: './detalle-leccion.component.css'
})
export class DetalleLeccionComponent implements OnInit {

  route = inject(ActivatedRoute);
  cursosService = inject(CoursesService);
  sanitizer = inject(DomSanitizer);

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

}
