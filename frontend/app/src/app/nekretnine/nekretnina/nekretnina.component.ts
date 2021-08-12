import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Korisnik } from 'src/app/modeli/korisnik';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css'],
})
export class NekretninaComponent implements OnInit {
  constructor(
    private ruta: ActivatedRoute,
    private nekretninaServis: NekretninaService,
    private ruter: Router
  ) {}

  nekretnina: Nekretnina;

  startDate = new Date();

  placanje: string = 'gotovina';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  poruka:string = "";

  ulogovan: Korisnik;

  ngOnInit(): void {
    if (!localStorage.getItem('korisnik')) {
      this.ruter.navigateByUrl('');
    }
    this.ulogovan = JSON.parse(localStorage.getItem('korisnik'));
    console.log('ulogovan:', this.ulogovan);
    this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.nekretninaServis
          .dohvatiNekretninu(paramMap.get('id'))
          .subscribe((odgovor) => {
            console.log(odgovor.poruka, odgovor.nekretnina);
            this.nekretnina = odgovor.nekretnina;
            console.log(this.nekretnina.iznajmljivanje);
          });
      }
    });
  }

  myFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const day = d;
    let result = true;
    for (var i = 0; i < this.nekretnina.iznajmljivanje.length; i++) {
      const izd = this.nekretnina.iznajmljivanje[i];
      let datumOd = new Date(izd.datumOd)
      datumOd.setHours(0,0,0,0);
      let datumDo = new Date(izd.datumDo)
      datumDo.setHours(0,0,0,0);
      if (day >= datumOd && day <= datumDo) {
        result = false;
        break;
      }
    }
    return result;
  };

  napraviPonudu(transakcija: string) {
    this.poruka = '';
    if (transakcija === 'izdavanje') {
      let datumOd = this.range.get('start').value;
      let datumDo = this.range.get('end').value;
      if (!datumOd || !datumDo) {
        this.poruka = "Potrebno je izabrati period izdavanja";
        return;
      }
      this.nekretninaServis
        .napraviPonudu(
          this.nekretnina._id,
          'gotovina',
          this.ulogovan.korime,
          datumOd,
          datumDo
        )
        .subscribe((odgovor) => {
          console.log(odgovor.poruka);
          this.poruka = odgovor.poruka.toUpperCase();
        });
    } else {
      this.nekretninaServis
        .napraviPonudu(
          this.nekretnina._id,
          this.placanje,
          this.ulogovan.korime,
          null,
          null
        )
        .subscribe((odgovor) => {
          console.log(odgovor.poruka);
          this.poruka = odgovor.poruka.toUpperCase();
        });
    }
  }
}
