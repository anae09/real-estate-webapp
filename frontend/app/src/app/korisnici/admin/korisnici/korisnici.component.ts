import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dodajKorisnika:boolean = false;

  prikaziRegistraciju() {
    this.dodajKorisnika = true;
  }

}
