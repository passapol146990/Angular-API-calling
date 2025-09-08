import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  menu: any[] = [
    {path:"",title:"Home"},
    {path:"/create/trips",title:"add trips"}
  ];
  constructor(){}
}
