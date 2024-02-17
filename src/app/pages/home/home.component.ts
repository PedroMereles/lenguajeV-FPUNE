import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private menuController: MenuController,
    private auth: Auth,
    private router: Router,
  ) { }

  ngOnInit() { }

  openMenu = () => {
    this.menuController.toggle('principal')
  }



}
