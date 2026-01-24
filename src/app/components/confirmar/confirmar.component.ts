import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.css'
})
export class ConfirmarComponent {
  dialogRef = inject(MatDialogRef<any>);
    data: any = inject(MAT_DIALOG_DATA);
  
    confirmar(): void {
      this.dialogRef.close(true);
    }
  
    cancelar(): void {
      this.dialogRef.close(false);
    }
}
