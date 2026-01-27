import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from '../../../interfaces/response.model';
import { Leccion } from '../../../interfaces/leccion.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CoursesService } from '../../CoursesServices/courses.service';

@Component({
  selector: 'app-guardar-leccion',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './guardar-leccion.component.html',
  styleUrl: './guardar-leccion.component.css'
})
export class GuardarLeccionComponent implements OnInit {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cursosService = inject(CoursesService);

  leccionForm!: FormGroup;
  idCurso!: string;
  idLeccion!: string | null;
  esEdicion = false;

  // Regex para validar URLs de YouTube
  youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.params['idCurso'];
    this.idLeccion = this.route.snapshot.params['idLeccion'];
    this.esEdicion = !!this.idLeccion;

    this.leccionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      orderIndex: [1, Validators.required],
      youtubeUrl: ['', Validators.pattern(this.youtubeUrlPattern)]
    });

    if (this.esEdicion) {
      this.cargarLeccion();
    }
  }

  cargarLeccion(): void {
    this.cursosService.listar(`/api/courses/${this.idCurso}`).subscribe(
      (response: response) => {
        if (response.status == 'SUCCESS') {
          const leccion = response.data.lessons.find((l: Leccion) => l.id == Number(this.idLeccion));
          if (leccion) {
            this.leccionForm.patchValue({
              title: leccion.title,
              description: leccion.description,
              orderIndex: leccion.orderIndex,
              youtubeUrl: leccion.youtubeUrl
            });
          }
        }
      }
    );
  }

  guardar(): void {
    if (this.leccionForm.invalid) return;

    const data = {
      ...this.leccionForm.value,
      youtubeUrl: this.formatearYtWatchToEmbed(this.leccionForm.value.youtubeUrl),
      courseId: this.idCurso
    };

    if (this.esEdicion) {
      this.cursosService.actualizar(`/api/lessons/update/${this.idLeccion}`, data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/cursos', this.idCurso]);
          }
        }
      );
    } else {
      this.cursosService.crear('/api/lessons/create', data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/cursos', this.idCurso]);
          }
        }
      );
    }
  }

   formatearYtWatchToEmbed(url: string): string {
    if (!url) return '';
    const match = url.match(/[?&]v=([^&]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }

  cancelar(): void {
    this.router.navigate(['/cursos', this.idCurso]);
  }
}
