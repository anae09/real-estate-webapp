import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/modeli/korisnik';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-moje-nekretnine',
  templateUrl: './moje-nekretnine.component.html',
  styleUrls: ['./moje-nekretnine.component.css']
})
export class MojeNekretnineComponent implements OnInit {

  constructor(private nekretninaServis: NekretninaService, private ruter: Router) { }

  mojeNekretnine: Nekretnina[];
  ulogovanKorisnik: Korisnik;

  ngOnInit(): void {
    if (!localStorage.getItem("korisnik")) {
      this.ruter.navigateByUrl('');
    }
    this.ulogovanKorisnik = JSON.parse(localStorage.getItem("korisnik"));
    let vlasnik = (this.ulogovanKorisnik.tip !== "agent" ? this.ulogovanKorisnik.korime : "agencija");
    this.nekretninaServis.dohvatiNekretnineVlasnika(vlasnik).subscribe(odgovor=> {
      console.log(odgovor.poruka);
      this.mojeNekretnine = odgovor.nekretnine;
    })
  }

  prikaziFormu:boolean = false;

  prikaziFormuNekretnine() {
    this.prikaziFormu = true;
  }

  ukloniNekretninu(id: string) {
    this.nekretninaServis.ukloniNekretninu(id).subscribe(odgovor=>{
      console.log(odgovor.poruka);
      this.mojeNekretnine = this.mojeNekretnine.filter(n => n._id !== id);
    })
  }

  prihvatiPonudu(_id: string, id: string, kupac:string) {
    this.nekretninaServis.prihvatiPonudu(_id, id, kupac).subscribe(odgovor=> {
      console.log(odgovor.poruka);
      var index = this.mojeNekretnine.findIndex(n => n._id === _id);
      if (index < 0) console.log("error, index:", index);
      else {
        for (var i = 0; i < this.mojeNekretnine[index].ponude.length; i++) {
          if (this.mojeNekretnine[index].ponude[i].id === id && this.mojeNekretnine[index].ponude[i].kupac === kupac) {
            this.mojeNekretnine[index].ponude[i].status = "prihvacena";
            break;
          }
        }
      }
    })
  }

  ukloniPonudu(_id: string, id: string) {
    this.nekretninaServis.ukloniPonudu(_id, id).subscribe(odgovor=> {
      console.log(odgovor.poruka);
      var index = this.mojeNekretnine.findIndex(n => n._id === _id);
      if (index < 0) console.log("error, index:", index);
      else
        this.mojeNekretnine[index].ponude = this.mojeNekretnine[index].ponude.filter(p => p.id !== id);
    });
  }

  prettyPrintDatum(datum: Date){
    let d = new Date(datum);
    let dan = d.getDate().toString();
    let mesec = (d.getMonth() + 1).toString();
    let godina = d.getFullYear().toString();
    return dan + "." + mesec + "." + godina;
  }


}
