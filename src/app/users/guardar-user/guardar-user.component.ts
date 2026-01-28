import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../UsersService/user.service';
import { response } from '../../interfaces/response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guardar-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './guardar-user.component.html',
  styleUrl: './guardar-user.component.css'
})
export class GuardarUserComponent implements OnInit {

  private readonly API_URL = 'api/admin/users';

  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);

  userForm!: FormGroup;
  idUser!: string | null;
  esEdicion = false;

  roles = [
    { value: { id: 2, name: 'ROLE_USER' }, label: 'Usuario' },
    { value: { id: 1, name: 'ROLE_ADMIN' }, label: 'Administrador' }
  ];
  rolesSeleccionados: any[] = [];

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUsuario'];
    this.esEdicion = !!this.idUser;
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.esEdicion ? [] : Validators.required]
    });

    if (this.esEdicion) {
      this.cargarUser();
    }
  }

  cargarUser(): void {
    this.userService.listar(`${this.API_URL}/${this.idUser}`).subscribe(
      (response: response) => {
        if (response.status == 'SUCCESS') {
          const userData = response.data;
          if (Array.isArray(userData.roles)) {
            userData.roles.forEach((rol: any) => {
              this.rolesSeleccionados.push(rol);
            })
          }

          this.userForm.patchValue({
            username: userData.username,
            email: userData.email
          });
        }
      }
    );
  }

  toggleRol(rol: any): void {
    const index = this.rolesSeleccionados.indexOf(rol);
    if (index === -1) {
      this.rolesSeleccionados.push(rol);
    } else {
      this.rolesSeleccionados.splice(index, 1);
    }
  }

  isRolSeleccionado(rol: any): boolean {
    for (let i = 0; i < this.rolesSeleccionados.length; i++) {
      if (this.rolesSeleccionados[i].name == rol.name)
        return true;
    }
    return false;
  }

  guardar(): void {
    if (this.userForm.invalid || this.rolesSeleccionados.length === 0) return;

    const data = {
      ...this.userForm.value,
      roles: this.rolesSeleccionados
    };

    if (this.esEdicion) {
      this.userService.actualizar(`${this.API_URL}/update/${this.idUser}`, data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/usuarios']);
          }
        }
      );
    } else {
      this.userService.crear(`${this.API_URL}/create`, data).subscribe(
        (response: response) => {
          if (response.status == 'SUCCESS') {
            this.router.navigate(['/usuarios']);
          }
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
