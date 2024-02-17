import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registrarUsuario: FormGroup;

  constructor(
    private menuController: MenuController,
    private fb: FormBuilder,
    private router: Router,
    private fauth: Auth,
  ) {

    this.registrarUsuario = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })

  }



  ngOnInit() { }

  registrar = () => {
    const name = this.registrarUsuario.value.name;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;

    createUserWithEmailAndPassword(this.fauth, email, password)
      .then((user: any) => {
        // Signed in 
        const usuario = user.user;
        console.log(user.user.auth.currentUser)
        this.verificarCorreo(user.user.auth.currentUser);
        this.router.navigate(['/login']);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });



  }

  verificarCorreo = (currentUser: any) => {
    sendEmailVerification(currentUser)
      .then(() => {
        console.log("Envio correcto")
        // Email verification sent!
        // ...
      });

  }

}
