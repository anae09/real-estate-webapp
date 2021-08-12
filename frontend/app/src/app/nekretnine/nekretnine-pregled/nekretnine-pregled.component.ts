import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-nekretnine-pregled',
  templateUrl: './nekretnine-pregled.component.html',
  styleUrls: ['./nekretnine-pregled.component.css']
})
export class NekretninePregledComponent implements OnInit {

  constructor(private ruter: Router, private nekretninaServis: NekretninaService) { }

  nekretnine: Nekretnina[];

  ngOnInit(): void {
    this.nekretninaServis.dohvatiSveNekretnine().subscribe(nekretnine=> {
      this.nekretnine = nekretnine;
    })
  }

  promovisiNekretninu(id: string) {
    this.nekretninaServis.promovisiNekretninu(id).subscribe(odgovor=> {
      console.log(odgovor.poruka);
      let index = this.nekretnine.findIndex(n => n._id == id);
      console.log("index",index);
      if (index > -1) this.nekretnine[index].promovisana = true;
    })
  }

  ukloniPromociju(id: string) {
    this.nekretninaServis.ukloniPromociju(id).subscribe(odgovor=> {
      console.log(odgovor.poruka);
      let index = this.nekretnine.findIndex(n => n._id == id);
      console.log("index",index);
      if (index > -1) this.nekretnine[index].promovisana = false;
    })
  }

  odobriNekretninu(id: string) {
    this.nekretninaServis.odobriNekretninu(id).subscribe(odgovor => {
      console.log(odgovor.poruka);
      let index = this.nekretnine.findIndex(n => n._id == id);
      console.log("index",index);
      if (index > -1) {
        this.nekretnine[index].status = "odobrena";
        this.nekretnine[index].aktivna = true;
      }
    });
  }

  ukloniNekretninu(id: string) {
    this.nekretninaServis.ukloniNekretninu(id).subscribe(odgovor => {
      console.log(odgovor.poruka);
      this.nekretnine = this.nekretnine.filter(n => n._id !== id);
    })
  }

}
