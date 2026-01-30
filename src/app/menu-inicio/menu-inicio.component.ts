import { Component, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../auth/AuthServices/auth.service';


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
    RouterOutlet,
  ],
  templateUrl: './menu-inicio.component.html',
  styleUrl: './menu-inicio.component.css',
})
export class MenuInicioComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  navList: MenuItem[] = [
    {
      path: '/inicio',
      icon: 'home',
      label: 'Inicio',
    },
    {
      path: '/cursos',
      icon: 'library_books',
      label: 'Cursos',
    },
  ];

  ngOnInit(): void {
    const roles = this.authService.getRolesFromStorage();

    if (roles.includes('ROLE_ADMIN')) {
      this.navList.push({
        path: '/usuarios',
        icon: 'supervised_user_circle',
        label: 'Usuarios',
      });
    }
  }

  opened = false;

  open(): void {
    this.opened = !this.opened;
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
