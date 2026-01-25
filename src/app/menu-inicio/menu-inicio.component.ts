import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { RouterLink, RouterOutlet } from "@angular/router";


interface MenuItem {
  path:string,
  icon:string,
  label:string
}


@Component({
  selector: 'app-menu-inicio',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckbox,
    MatIcon,
    MatToolbar,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    RouterLink,
    RouterOutlet
],
  templateUrl: './menu-inicio.component.html',
  styleUrl: './menu-inicio.component.css',
})
export class MenuInicioComponent {
  navList: MenuItem[] = [
    {
      path: '/inicio',
      icon: '',
      label: 'Inicio',
    },
    {
      path: '/cursos',
      icon: '',
      label: 'Cursos',
    },
    {
      path: '/usuarios',
      icon:'',
      label:'Usuarios'
    }
  ];

  opened = false;

  open(): void {
    this.opened = !this.opened;
  }
}
