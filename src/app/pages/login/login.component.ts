import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  iniciarUsuario: FormGroup;
  errorMessage = '';

  constructor(

    private menuController: MenuController,
    private fb: FormBuilder,
    private router: Router,
    private fauth: Auth,

  ) {

    this.iniciarUsuario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() { }


  logIn = () => {
    const email = this.iniciarUsuario.value.email;
    const password = this.iniciarUsuario.value.password;

    signInWithEmailAndPassword(this.fauth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.router.navigate(['/home']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-credential':
            this.errorMessage = 'Error en las credenciales';
            break;
          default:
            this.errorMessage = error.message;

        }
      });



  }

}
