import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface AlertaData {
  titulo: string;
  mensaje: string;
  tipo: 'exito' | 'error' | 'advertencia' | 'info';
}

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  dialogRef = inject(MatDialogRef<AlertaComponent>);
  data: AlertaData = inject(MAT_DIALOG_DATA);

  getIcono(): string {
    const iconos = {
      exito: 'check_circle',
      error: 'error',
      advertencia: 'warning',
      info: 'info'
    };
    return iconos[this.data.tipo] || 'info';
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
