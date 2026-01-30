import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../UsersService/user.service';
import { AlertaComponent, AlertaData } from '../../components/alerta/alerta.component';

@Component({
  selector: 'app-listar-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatPaginatorModule],
  templateUrl: './listar-users.component.html',
  styleUrl: './listar-users.component.css'
})
export class ListarUsersComponent implements OnInit {

  private readonly API_URL = 'api/admin/users';

  displayedColumns: string[] = ['id', 'usuario', 'email', 'roles', 'acciones'];
  userService = inject(UserService);
  router = inject(Router);
  dialog = inject(MatDialog);
  usuarios: any[] = [];

  currentPage = 0;
  pageSize = 5;
  totalElements = 0;

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.userService.listar(this.API_URL, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.usuarios = response.data.content;
        this.totalElements = response.data.totalElements;
      },
      error: (error) => {
        console.error('Error al listar usuarios:', error);
        this.mostrarAlerta('Error', 'No se pudo cargar la lista de usuarios', 'error');
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarUsuarios();
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
          this.mostrarAlerta('Éxito', 'Usuario eliminado correctamente', 'exito');
          this.listarUsuarios();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          this.mostrarAlerta('Error', 'No se pudo eliminar el usuario', 'error');
        }
      });
    }
  }

  mostrarAlerta(titulo: string, mensaje: string, tipo:string): void {
    this.dialog.open(AlertaComponent, {
      data: { titulo, mensaje, tipo } as AlertaData
    });
  }
}
