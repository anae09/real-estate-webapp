import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/modeli/korisnik';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-korisnik-pocetna',
  templateUrl: './korisnik-pocetna.component.html',
  styleUrls: ['./korisnik-pocetna.component.css']
})
export class KorisnikPocetnaComponent implements OnInit {

  constructor(private ruter: Router, private nekretninaServis: NekretninaService) { }

  korisnik: Korisnik;
  nekretninePregled:Nekretnina[] = [];

  grad: string = null;
  cenaOd: number = null;
  cenaDo: number = null;
  poruka: string = null;

  ngOnInit(): void {
    if (!localStorage.getItem("korisnik")) {
      this.ruter.navigateByUrl('');
    }
    this.korisnik = JSON.parse(localStorage.getItem("korisnik"));
    this.nekretninaServis.dohvatiSveNekretnine().subscribe((nekretnine:Nekretnina[])=>{
      console.log(nekretnine);
      this.nekretninePregled = nekretnine.filter(n => n.aktivna === true && n.status == "odobrena");
    })
  }

  pretraga() {
    this.poruka = "";
    if (this.cenaDo && this.cenaOd && this.cenaOd > this.cenaDo) {
      this.poruka = "Neispravan opseg cena";
      return;
    }
    this.nekretninaServis.pretraga(this.grad, this.cenaOd, this.cenaDo).subscribe((nekretnine:Nekretnina[])=> {
      this.nekretninePregled = nekretnine;
    })
  }

  iseciTekst(tekst: string) {
    if (tekst.length > 40) return tekst.substring(0,40) + "...";
    return tekst;
  }

}
