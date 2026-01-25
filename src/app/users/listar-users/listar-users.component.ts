import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listar-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './listar-users.component.html',
  styleUrl: './listar-users.component.css'
})
export class ListarUsersComponent implements OnInit {

  private readonly API_URL = 'api/admin/users';

  displayedColumns: string[] = ['id', 'usuario', 'email', 'roles', 'acciones'];
  userService = inject(UserService);
  router = inject(Router);
  usuarios: any[] = [];

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.userService.listar(this.API_URL).subscribe({
      next: (response) => {
        this.usuarios = response.data;
      },
      error: (error) => {
        console.error('Error al listar usuarios:', error);
      }
    });
  }

  crearUsuario(): void {
    this.router.navigate(['/usuarios/crear']);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.userService.eliminar(`${this.API_URL}/${id}`).subscribe({
        next: () => {
          this.listarUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }
}
