import { Component, OnInit } from '@angular/core';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.css'],
})
export class PonudeComponent implements OnInit {
  constructor(private nekretninaServis: NekretninaService) {}

  nekretnine: Nekretnina[];

  poruka: string = '';

  ngOnInit(): void {
    this.nekretninaServis
      .dohvatiSveNekretnine()
      .subscribe(nekretnine => {
        this.nekretnine = nekretnine;
        this.poruka = 'Nema aktivnih ponuda';
        for (var i = 0; i < nekretnine.length; i++) {
          if (nekretnine[i].ponude.length > 0) {
            this.poruka = "";
            break;
          }
        }
        // for (var i = 0; i < nekretnine.length; i++) {
        //   if (!nekretnine[i].ponude || nekretnine[i].ponude.length === 0) continue;
        //   nekretnine[i].ponude = nekretnine[i].ponude.filter(p => p.status !== 'cekanje');
        // }
      });
  }

  potvrdiPonudu(_id: string, id: string) {
    var index = this.nekretnine.findIndex((n) => n._id === _id);
    if (index < 0) console.log('error index: ', index);
    else if (this.nekretnine[index].transakcija.toLowerCase() === 'prodaja') {
      this.nekretninaServis.potvrdiKupovinu(_id, id).subscribe((odgovor) => {
        console.log(odgovor.poruka);
      });
      // ostale ponude se odbijaju
      for (var j = 0; j < this.nekretnine[index].ponude.length; j++) {
        let ponuda = this.nekretnine[index].ponude[j];
        if (ponuda.id === id) continue;
        this.nekretninaServis.odbijPonudu(_id, ponuda.id).subscribe((odgovor) => {
          console.log(odgovor.poruka);
          this.nekretnine[index].ponude[j].status = 'neodobrena';
        });
      }
    } else {
      let datumOd, datumDo;
      for (var i = 0; i < this.nekretnine[index].ponude.length; i++) {
        if (this.nekretnine[index].ponude[i].id === id) {
          datumOd = this.nekretnine[index].ponude[i].datumOd;
          datumDo = this.nekretnine[index].ponude[i].datumDo;
          break;
        }
      }
      this.nekretninaServis.potvrdiIzdavanje(_id, id, datumOd, datumDo).subscribe((odgovor) => {
        console.log(odgovor.poruka);
      });
    }
    for (var i = 0; i < this.nekretnine[index].ponude.length; i++) {
      if (this.nekretnine[index].ponude[i].id === id) {
        this.nekretnine[index].ponude[i].status = 'odobrena';
        break;
      }
    }
  }

  odbijPonudu(_id: string, id: string) {
    this.nekretninaServis.odbijPonudu(_id, id).subscribe((odgovor) => {
      console.log(odgovor.poruka);
    });
    var index = this.nekretnine.findIndex((n) => n._id === _id);
    if (index < 0) console.log('error index: ', index);
    else {
      for (var i = 0; i < this.nekretnine[index].ponude.length; i++) {
        if (this.nekretnine[index].ponude[i].id === id) {
          this.nekretnine[index].ponude[i].status = 'neodobrena';
          break;
        }
      }
    }
  }

  prettyPrintDatum(datum: Date){
    let d = new Date(datum);
    let dan = d.getDate().toString();
    let mesec = (d.getMonth() + 1).toString();
    let godina = d.getFullYear().toString();
    return dan + "." + mesec + "." + godina;
  }
}
