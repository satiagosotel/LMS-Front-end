import {Component, inject, OnInit} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {
  FormBuilder,
  FormControl, FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthResponse } from '../../interfaces/auth-response.model';
import { AuthService } from '../AuthServices/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterOutlet
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  // private route = inject(ActivatedRoute);
  private router = inject(Router);




  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  loginSubmit() {
    this.authService
      .login('/api/auth/login', this.formGroup.value)
      .subscribe((response:AuthResponse) => {
          this.router.navigateByUrl('/inicio');
      });
  }
}
