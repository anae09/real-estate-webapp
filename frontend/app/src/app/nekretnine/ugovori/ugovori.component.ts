import { Component, OnInit } from '@angular/core';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';
import { ProcenatService } from 'src/app/procenat.service';

@Component({
  selector: 'app-ugovori',
  templateUrl: './ugovori.component.html',
  styleUrls: ['./ugovori.component.css']
})
export class UgovoriComponent implements OnInit {

  constructor(private nekretninaServis: NekretninaService, private procenatServis: ProcenatService) { }

  nekretnine: Nekretnina[];
  procenatProdaje: number;
  procenatIzdavanja: number;

  ngOnInit(): void {
    this.nekretninaServis.dohvatiSveNekretnine().subscribe((nekretnine:Nekretnina[])=> {
      this.nekretnine = nekretnine.filter(n => n.aktivna === false || n.iznajmljivanje.length > 0);
    });
    this.procenatServis.dohvatiProcenat().subscribe(p=> {
      this.procenatProdaje = p[0].prodaja;
      this.procenatIzdavanja = p[0].izdavanje;
    });
  }

  cenaPoDanu(cena: number) {
    return cena*1.0/30;
  }

  brojDana(datumOd: Date, datumDo: Date) {
    let razlika = new Date(datumDo).getTime() - new Date(datumOd).getTime();
    if (razlika === 0) return 1;
    return razlika/(1000*60*60*24);
  }

  prettyPrintDatum(datum: Date){
    let d = new Date(datum);
    let dan = d.getDate().toString();
    let mesec = (d.getMonth() + 1).toString();
    let godina = d.getFullYear().toString();
    return dan + "." + mesec + "." + godina;
  }

}
