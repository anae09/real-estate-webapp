import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-korisnik',
  templateUrl: './header-korisnik.component.html',
  styleUrls: ['./header-korisnik.component.css']
})
export class HeaderKorisnikComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
  }

  odjava() {
    localStorage.clear();
    this.ruter.navigateByUrl('');
  }

}
