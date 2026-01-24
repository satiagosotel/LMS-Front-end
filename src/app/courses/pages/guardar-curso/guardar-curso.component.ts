import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../services/CoursesServices/courses.service';
import { response } from '../../../interfaces/response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-guardar-curso',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './guardar-curso.component.html',
  styleUrl: './guardar-curso.component.css'
})
export class GuardarCursoComponent implements OnInit {

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cursosService = inject(CoursesService);

  cursoForm!: FormGroup;
  idCurso!: string | null;
  esEdicion = false;

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.params['idCurso'];
    this.esEdicion = !!this.idCurso;

    this.cursoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.esEdicion) {
      this.cargarCurso();
    }
  }

  cargarCurso(): void {
    this.cursosService.listar(`/api/courses/${this.idCurso}`).subscribe(
      (response: response) => {
        if (response.status == 'SUCCESS') {
          this.cursoForm.patchValue({
            title: response.data.title,
            description: response.data.description
          });
        }
      }
    );
  }

  guardar(): void {
    if (this.cursoForm.invalid) return;

    const data = this.cursoForm.value;

    if (this.esEdicion) {
      this.cursosService.actualizar(`/api/courses/update/${this.idCurso}`, data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/cursos']);
          }
        }
      );
    } else {
      this.cursosService.crear('/api/courses/create', data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/cursos']);
          }
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }

}
