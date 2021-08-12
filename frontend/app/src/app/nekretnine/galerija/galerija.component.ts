import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Navigation, Lazy } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Lazy]);

@Component({
  selector: 'app-galerija',
  templateUrl: './galerija.component.html',
  styleUrls: ['./galerija.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalerijaComponent implements OnInit {

  nekretnina: Nekretnina;

  constructor(private route: ActivatedRoute, private nekretninaServis: NekretninaService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has('id')) {
        this.nekretninaServis.dohvatiNekretninu(paramMap.get('id')).subscribe(odgovor=>{
          //console.log(odgovor.poruka, odgovor.nekretnina);
          this.nekretnina = odgovor.nekretnina;
        })
      }
      if (!localStorage.getItem('foo')) {
        localStorage.setItem('foo', 'no reload');
        location.reload();
      } else {
        localStorage.removeItem('foo');
      }
    })
  }



}
