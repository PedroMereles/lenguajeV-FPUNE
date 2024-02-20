import { Component, OnInit } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  resetUsuario: FormGroup;

  constructor(
    private fr: FormBuilder,
    private rt: Router,
    private fauth: Auth
  ) {

    this.resetUsuario = this.fr.group({
      email: ['', [Validators.required]],
    })
  }

  ngOnInit() { }

  recuperarClave = () => {
    const email = this.resetUsuario.value.email;
    sendPasswordResetEmail(this.fauth, email)
      .then(() => {
        // Password reset email sent!
        console.log('Correo enviado');
        this.rt.navigate(['/home']);
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

}
