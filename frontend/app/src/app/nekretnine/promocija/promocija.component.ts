import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/modeli/korisnik';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-promocija',
  templateUrl: './promocija.component.html',
  styleUrls: ['./promocija.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PromocijaComponent implements OnInit {

  constructor(private nekretninaServis: NekretninaService, private ruter: Router) { }

  promovisaneNekretnine: Nekretnina[];
  ulogovanKorisnik: Korisnik;

  ngOnInit(): void {
    if (!localStorage.getItem("korisnik")) {
      this.ruter.navigateByUrl('');
    }
    this.ulogovanKorisnik = JSON.parse(localStorage.getItem("korisnik"));
    this.nekretninaServis.dohvatiPromovisane().subscribe(nekretnine=> {
      this.promovisaneNekretnine = nekretnine;
    })
  }

}
